import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/_alert';
import { World } from 'src/app/_model/world';
import { Race } from '../../model/race';
import { Region } from '../../model/region';
import { SocialClass } from '../../model/social-class';
import { RaceService } from '../../race/service/race.service';
import { RegionService } from '../../region/service/region.service';
import { WorldStorageService } from '../../service/world-storage.service';
import { SocialClassService } from '../../socialClass/service/social-class.service';
import { forkJoin, switchMap, Observable } from 'rxjs';
import { of, map, lastValueFrom } from 'rxjs';


@Component({
  selector: 'app-social-class-form',
  templateUrl: './social-class-form.component.html',
  styleUrls: ['./social-class-form.component.css',]
})
export class SocialClassFormComponent {
  socialClass: SocialClass;
  world: World;
  id: string;
  worldId: string;
  isAddMode: boolean;
  public loading = false;
  redirectUrl: string | undefined;
  regions: Array<Region>;
  races: Array<Race>


  form = this.formBuilder.group({
    name: ['', {
        validators: [
           Validators.required,
           Validators.minLength(3),
           Validators.maxLength(64)
        ],
        updateOn: 'blur'
    }],
    description: ['', {
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(1024)
      ],
      updateOn: 'blur'
    }],
    region: [''],
    race: ['']
  });

  constructor(
    private route: ActivatedRoute, 
      private router: Router, 
        private alertService: AlertService,
        private formBuilder: FormBuilder,
        private worldStorage: WorldStorageService,
        private socialClassService: SocialClassService,
        private regionService: RegionService,
        private raceService: RaceService) {
    
    this.redirectUrl = this.router.getCurrentNavigation()?.previousNavigation?.finalUrl?.toString();
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.socialClass = new SocialClass();
    this.socialClass.world = this.worldStorage.getWorld();
    const observables = {regions: this.regionService.findByWorld(this.worldStorage.getWorld()),
                        races: this.raceService.findByWorld(this.worldStorage.getWorld())};
    const results = forkJoin(observables);
    this.loading = true;
    results.subscribe(data => {
      this.loading = false;
      this.regions = data.regions;
      this.races = data.races;
    });
    if (!this.isAddMode) {
      this.loading = true;
      this.socialClassService.findById(this.id).subscribe({
        next: data => {
            this.loading = false;
            this.socialClass = data;
            this.form.patchValue({
              name: this.socialClass.name,
              description: this.socialClass.description,
              region: this.socialClass.region?.id,
              race: this.socialClass.race?.id
            });
          }, error: err => {
            this.loading = false;
            this.alertService.error("Error retrieving social class: " + err.error?.error);
        }
      });
    } 
  }

  async onSubmit() {
    if (this.form.valid) {
      this.loading = true;
      const name = this.form.controls.name.value?.trim() || '';
      const description = this.form.controls.description.value?.trim() || '';
      this.socialClass = {
        name: name,
        description: description,
        world: this.worldStorage.getWorld()
      };
      if (!this.isAddMode)
        this.socialClass.id = this.id;

      
      const regionAction = this.form.controls.region.value ? this.regionService.findById(this.form.controls.region.value) : of(new Region);   
      const raceAction = this.form.controls.race.value ? this.raceService.findById(this.form.controls.race.value) : of(new Race);   
      const observables = {region: regionAction, race: raceAction};
      const results = forkJoin(observables);
      results.pipe(
        switchMap(result => {
          this.socialClass.region = (Number(result.region.id) > 0 ? result.region : undefined);
          this.socialClass.race = (Number(result.race.id) > 0 ? result.race : undefined);
          return this.isAddMode ? this.socialClassService.create(this.socialClass) : this.socialClassService.update(this.socialClass);
        }))
        .subscribe({
          next: result => {
            this.loading = false;
            const message = this.isAddMode ? 'Social class saved successfully!' : 'Social class updated successfully!';
            this.alertService.success(message);
            this.gotoRedirect();
          },
          error: err => {
            this.loading = false;
            const message = this.isAddMode ? 'Error creating Social class: ' : 'Error updating Social class: ';
            this.alertService.error(message + err.error.error);
          }
        });
      }  else {
        this.validateAllFormFields(this.form);
      }
    }

    validateAllFormFields(formGroup: FormGroup) {         
      Object.keys(formGroup.controls).forEach(field => {  
        const control = formGroup.get(field);             
        if (control instanceof FormControl) {             
          control.markAsTouched({ onlySelf: true });
        } else if (control instanceof FormGroup) {        
          this.validateAllFormFields(control);            
        }
      });
    }

  gotoRedirect() {
    this.router.navigate(['/'+this.redirectUrl]);
  }
}
