import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/_alert';
import { World } from 'src/app/_model/world';
import { Geography } from '../../model/geography';
import { WorldStorageService } from '../../service/world-storage.service';
import { GeographyService } from '../../geography/service/geography.service';
import { Resource } from '../../model/resource';
import { forkJoin, switchMap, Observable } from 'rxjs';
import { ResourceService } from '../../resource/service/resource.service';
import { of } from 'rxjs';


@Component({
  selector: 'app-geography-form',
  templateUrl: './geography-form.component.html',
  styleUrls: ['./geography-form.component.css',]
})
export class GeographyFormComponent {
  public loading = false;
  redirectUrl: string | undefined;
  geography: Geography;
  world: World;
  id: string;
  worldId: string;
  isAddMode: boolean;
  resourcesList: Array<Resource>;
  newResources: any[] = [];
  resources: Array<Resource> = [];
  types: string[] = ["CONTINENT",
                      "OCEAN",
                      "SEA",
                      "LAKE",
                      "RIVER",
                      "LAGOON",
                      "CREEK",
                      "GULF",
                      "MARSH",
                      "STREAM",
                      "SWAMP",
                      "BAY",
                      "WATERFALL",
                      "PLATEAU",
                      "PLAIN",
                      "HILL",
                      "CANYON",
                      "CAVE",
                      "ISLAND",
                      "ISLET",
                      "VOLCANO",
                      "MOUNTAIN",
                      "VALLEY",
                      "FOREST_TEMPERATE",
                      "FOREST_BOREAL",
                      "FOREST_TROPICAL",
                      "DESERT_SUBTROPICAL",
                      "DESERT_COASTAL",
                      "DESERT_COLD_WINTER",
                      "DESERT_POLAR"];
  climates: string[] = ["ALPINE_CLIMATE",
                        "DESERT_CLIMATE",
                        "ARID_CLIMATE",
                        "HUMID_CONTINENTAL_CLIMATE",
                        "HUMID_SUBTROPICAL_CLIMATE",
                        "ICE_CAP_CLIMATE",
                        "OCEANIC_CLIMATE",
                        "SUBARCTIC_CLIMATE",
                        "SEMI_ARID_CLIMATE",
                        "MEDITERRANEAN_CLIMATE",
                        "TROPICAL_MONSOON_CLIMATE",
                        "TROPICAL_RAINFOREST_CLIMATE",
                        "TROPICAL_SAVANNA_CLIMATE",
                        "TUNDRA_CLIMATE",
                        "POLAR_CLIMATE",
                        "OTHER"];
  geographies: Array<Geography>;

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
        Validators.required
      ],
      updateOn: 'blur'
    }],
    climate: [''],
    resources:  new FormControl<Resource[] | null>([]),
    newResources: this.formBuilder.array([]),
    parentGeography: ['']
  });

  constructor(
    private route: ActivatedRoute, 
      private router: Router, 
        private alertService: AlertService,
        private formBuilder: FormBuilder,
        private worldStorage: WorldStorageService,
        private geographyService: GeographyService,
        private resourceService: ResourceService) {
    
    this.redirectUrl = this.router.getCurrentNavigation()?.previousNavigation?.finalUrl?.toString();
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.geography = new Geography();
    this.geography.world = this.worldStorage.getWorld();

    if (!this.isAddMode) {
      this.loading = true;
      this.geographyService.findById(this.id).subscribe({
        next: data => {
          this.loading = true;
          const observables = {resources: this.resourceService.findByWorld(this.worldStorage.getWorld()),
                              geographies: this.geographyService.findByWorldExcluding(this.worldStorage.getWorld(), data)};
          const results = forkJoin(observables);
          results.subscribe(data => {
              this.loading = false;
              this.resourcesList = data.resources;
              this.geographies = data.geographies;
          });
            this.geography = data;
            this.form.patchValue({
              name: this.geography.name,
              description: this.geography.description,
              type: this.geography.type,
              climate: this.geography.climate,
              parentGeography: this.geography.parentGeography?.id,
              resources: this.geography.resources
            });
          }, error: err => {
            this.loading = false;
            this.alertService.error("Error retrieving geography: " + err.error?.error);
        }
      });
    } else {
      this.loading = true;
      const observables = {resources: this.resourceService.findByWorld(this.worldStorage.getWorld()),
                          geographies: this.geographyService.findByWorld(this.worldStorage.getWorld())};
      const results = forkJoin(observables);
      results.subscribe(data => {
          this.loading = false;
          this.resourcesList = data.resources;
          this.geographies = data.geographies;
      });
    }
  }

  async onSubmit() {
    if (this.form.valid) {
      this.loading = true;
      const name = this.form.controls.name.value?.trim() || '';
      const description = this.form.controls.description.value?.trim() || '';
      const type = this.form.controls.type.value || '';
      const climate = this.form.controls.climate.value || '';
      this.geography = {
        name: name,
        description: description,
        world: this.worldStorage.getWorld(),
        type: type,
        climate: climate
      };
      if (!this.isAddMode)
        this.geography.id = this.id;

        const geographyAction = this.form.controls.parentGeography.value ? this.geographyService.findById(this.form.controls.parentGeography.value) : of(new Geography);   
        await this.createResources().then(res =>{
          geographyAction.pipe(
            switchMap(result => {
              this.geography.resources = this.resources;
              this.geography.parentGeography = (Number(result.id) > 0 ? result : undefined);
              const observe = this.isAddMode ? this.geographyService.create(this.geography) : this.geographyService.update(this.geography);
              return observe;
            })
          ).subscribe({
              next: result => {
                this.loading = false;
                const message = this.isAddMode ? 'Geography saved successfully!' : 'Geography updated successfully!';
                this.alertService.success(message);
                this.gotoRedirect();
              },
              error: err => {
                this.loading = false;
                const message = this.isAddMode ? 'Error creating Geography: ' : 'Error updating Geography: ';
                this.alertService.error(message + err.error?.error);
              }
            });
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

    async createResources() {
      const resourcesFieldAsFormArray = this.resourcesFieldAsFormArray;
      const resourcesArray = this.form.get('resources')?.value as Array<Resource>;
     
      resourcesArray.forEach(rsc => {
        this.resources.push(rsc);
      });
  
      if (resourcesFieldAsFormArray.length) {
        const observables: Observable<Resource> = resourcesFieldAsFormArray.controls.map((control: { controls: { name: { value: string; }; description: { value: string; }; }; }, index: any) => {
          const resource = new Resource();
          resource.name = control.controls.name.value;
          resource.description = control.controls.description.value;
          resource.world = this.worldStorage.getWorld();
          return this.resourceService.create(resource);
        });
        const results = forkJoin(observables);
        results.subscribe(rsc => this.resources = this.resources.concat(rsc));
      }
    }
  
    compareObjects(o1: any, o2: any): boolean {
      return o1.segName === o2.segName && o1.id === o2.id;
    }
  
    addResource(): void {
      this.resourcesFieldAsFormArray.push(this.resource());
    }
  
    removeResource(i: number): void {
      this.resourcesFieldAsFormArray.removeAt(i);
    }
  
    get resourcesFieldAsFormArray(): any {
      return this.form.get('newResources') as FormArray;
    }
  
    resource(): any {
      return this.formBuilder.group({
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
      }]});
    }

  gotoRedirect() {
    this.router.navigate(['/'+this.redirectUrl]);
  }
}
