import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/_alert';
import { World } from 'src/app/_model/world';
import { PoliticalSystem } from '../../model/political-system';
import { WorldStorageService } from '../../service/world-storage.service';
import { PoliticalSystemService } from '../../politicalSystem/service/political-system.service';


@Component({
  selector: 'app-political-system-form',
  templateUrl: './political-system-form.component.html',
  styleUrls: ['./political-system-form.component.css',]
})
export class PoliticalSystemFormComponent {
  politicalSystem: PoliticalSystem;
  world: World;
  id: string;
  worldId: string;
  isAddMode: boolean;
  public loading = false;
  redirectUrl: string | undefined;
  types: string[] = ["DEMOCRACY",
                    "AUTHORITARIANISM",
                    "TOTALITARIAN",
                    "MONARCHY",
                    "OLIGARCHY",
                    "THEOCRACY",
                    "COLONIALISM",
                    "ARISTOCRACY",
                    "SOCIALISM",
                    "COMMUNISM",
                    "DICTATORSHIP"];

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
    type: ['', {
      validators: [
        Validators.required,
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
        private politicalSystemService: PoliticalSystemService) {
    
    this.redirectUrl = this.router.getCurrentNavigation()?.previousNavigation?.finalUrl?.toString();
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.politicalSystem = new PoliticalSystem();
    this.politicalSystem.world = this.worldStorage.getWorld();

    if (!this.isAddMode) {
      this.loading = true;
      this.politicalSystemService.findById(this.id).subscribe({
        next: data => {
            this.loading = false;
            this.politicalSystem = data;
            this.form.patchValue({
              name: this.politicalSystem.name,
              description: this.politicalSystem.description,
              type: this.politicalSystem.type
            });
          }, error: err => {
            this.loading = false;
            this.alertService.error("Error retrieving political system: " + err.error.error);
        }
      });
    } 
  }

  async onSubmit() {
    if (this.form.valid) {
      this.loading = true;
      const name = this.form.controls.name.value?.trim() || '';
      const description = this.form.controls.description.value?.trim() || '';
      const type = this.form.controls.type.value || '';
      this.politicalSystem = {
        name: name,
        description: description,
        world: this.worldStorage.getWorld(),
        type: type.toUpperCase()
      };
      if (!this.isAddMode)
        this.politicalSystem.id = this.id;

      const observe = this.isAddMode ? this.politicalSystemService.create(this.politicalSystem) : this.politicalSystemService.update(this.politicalSystem);
      
      observe.subscribe({
          next: result => {
            this.loading = false;
            const message = this.isAddMode ? 'Political System saved successfully!' : 'Political System updated successfully!';
            this.alertService.success(message);
            this.gotoRedirect();
          },
          error: err => {
            this.loading = false;
            const message = this.isAddMode ? 'Error creating Political System: ' : 'Error updating Political System: ';
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
