import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/_alert';
import { World } from 'src/app/_model/world';
import { Resource } from '../../model/resource';
import { WorldStorageService } from '../../service/world-storage.service';
import { ResourceService } from '../../resource/service/resource.service';


@Component({
  selector: 'app-resource-form',
  templateUrl: './resource-form.component.html',
  styleUrls: ['./resource-form.component.css',]
})
export class ResourceFormComponent {
  resource: Resource;
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
        private resourceService: ResourceService) {
    
    this.redirectUrl = this.router.getCurrentNavigation()?.previousNavigation?.finalUrl?.toString();
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.resource = new Resource();
    this.resource.world = this.worldStorage.getWorld();

    if (!this.isAddMode) {
      this.loading = true;
      this.resourceService.findById(this.id).subscribe({
        next: data => {
            this.loading = false;
            this.resource = data;
            this.form.patchValue({
              name: this.resource.name,
              description: this.resource.description
            });
          }, error: err => {
            this.loading = false;
            this.alertService.error("Error retrieving resource: " + err.error.error);
        }
      });
    } 
  }

  async onSubmit() {
    if (this.form.valid) {
      this.loading = true;
      const name = this.form.controls.name.value?.trim() || '';
      const description = this.form.controls.description.value?.trim() || '';
      this.resource = {
        name: name,
        description: description,
        world: this.worldStorage.getWorld()
      };
      if (!this.isAddMode)
        this.resource.id = this.id;

      const observe = this.isAddMode ? this.resourceService.create(this.resource) : this.resourceService.update(this.resource);
      
      observe.subscribe({
          next: result => {
            this.loading = false;
            const message = this.isAddMode ? 'Resource saved successfully!' : 'Resource updated successfully!';
            this.alertService.success(message);
            this.gotoRedirect();
          },
          error: err => {
            this.loading = false;
            const message = this.isAddMode ? 'Error creating Resource: ' : 'Error updating Resource: ';
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
