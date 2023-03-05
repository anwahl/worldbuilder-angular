import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/_alert';
import { World } from 'src/app/_model/world';
import { Religion } from '../../model/religion';
import { WorldStorageService } from '../../service/world-storage.service';
import { ReligionService } from '../../religion/service/religion.service';


@Component({
  selector: 'app-religion-form',
  templateUrl: './religion-form.component.html',
  styleUrls: ['./religion-form.component.css',]
})
export class ReligionFormComponent {
  religion: Religion;
  world: World;
  id: string;
  worldId: string;
  isAddMode: boolean;
  public loading = false;
  redirectUrl: string | undefined;

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
    }]
  });

  constructor(
    private route: ActivatedRoute, 
      private router: Router, 
        private alertService: AlertService,
        private formBuilder: FormBuilder,
        private worldStorage: WorldStorageService,
        private religionService: ReligionService) {
    
    this.redirectUrl = this.router.getCurrentNavigation()?.previousNavigation?.finalUrl?.toString();
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.religion = new Religion();
    this.religion.world = this.worldStorage.getWorld();

    if (!this.isAddMode) {
      this.loading = true;
      this.religionService.findById(this.id).subscribe({
        next: data => {
            this.loading = false;
            this.religion = data;
            this.form.patchValue({
              name: this.religion.name,
              description: this.religion.description
            });
          }, error: err => {
            this.loading = false;
            this.alertService.error("Error retrieving religion: " + err.error.error);
        }
      });
    } 
  }

  async onSubmit() {
    if (this.form.valid) {
      this.loading = true;
      const name = this.form.controls.name.value?.trim() || '';
      const description = this.form.controls.description.value?.trim() || '';
      this.religion = {
        name: name,
        description: description,
        world: this.worldStorage.getWorld()
      };
      if (!this.isAddMode)
        this.religion.id = this.id;

      const observe = this.isAddMode ? this.religionService.create(this.religion) : this.religionService.update(this.religion);
      
      observe.subscribe({
          next: result => {
            this.loading = false;
            const message = this.isAddMode ? 'Religion saved successfully!' : 'Religion updated successfully!';
            this.alertService.success(message);
            this.gotoRedirect();
          },
          error: err => {
            this.loading = false;
            const message = this.isAddMode ? 'Error creating Religion: ' : 'Error updating Religion: ';
            this.alertService.error(message + err.error.error);
          }
        });
    } else {
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
