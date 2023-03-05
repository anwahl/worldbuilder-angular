import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/_alert';
import { World } from 'src/app/_model/world';
import { Region } from '../../model/region';
import { WorldStorageService } from '../../service/world-storage.service';
import { RegionService } from '../../region/service/region.service';
import { Geography } from '../../model/geography';
import { PoliticalSystem } from '../../model/political-system';
import { Resource } from '../../model/resource';
import { GeographyService } from '../../geography/service/geography.service';
import { ResourceService } from '../../resource/service/resource.service';
import { PoliticalSystemService } from '../../politicalSystem/service/political-system.service';
import { forkJoin, switchMap, Observable } from 'rxjs';
import { of, map, lastValueFrom } from 'rxjs';


@Component({
  selector: 'app-region-form',
  templateUrl: './region-form.component.html',
  styleUrls: ['./region-form.component.css',]
})
export class RegionFormComponent {
  region: Region;
  world: World;
  id: string;
  worldId: string;
  isAddMode: boolean;
  public loading = false;
  redirectUrl: string | undefined;
  municipalities: string[] = ["COUNTRY",
                              "STATE",
                              "CITY",
                              "TOWN",
                              "TOWNSHIP",
                              "VILLAGE",
                              "BOROUGH",
                              "DISTRICT",
                              "PRECINT",
                              "PROVIDENCE",
                              "COMMUNE",
                              "FEDERATION",
                              "OTHER"];
  geographies: Array<Geography>;
  geography: Geography;
  createGeography = false;
  jurisdictions: Array<Region>;
  jurisdiction: Region;
  politicalSystems: Array<PoliticalSystem>;
  politicalSystem: PoliticalSystem;
  createPoliticalSystem = false;
  psTypes: string[] = ["DEMOCRACY",
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
  resourcesList: Array<Resource>;
  newResources: any[] = [];
  resources: Array<Resource> = [];
  geoTypes: string[] = ["CONTINENT",
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
  parentGeographies: Array<Geography>;


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
    municipality: ['', {
      validators: [
        Validators.required]
      }],
    jurisdiction: [''],
    geography: ['', {
      validators: [
        Validators.required ]}],
    newGeography: this.formBuilder.group({
      name: ['', {
        validators: [
           Validators.minLength(3),
           Validators.maxLength(64)
        ],
        updateOn: 'blur'
        }],
        description: ['', {
          validators: [
            Validators.minLength(3),
            Validators.maxLength(1024)
          ],
          updateOn: 'blur'
        }],
        type: [''],
        climate: [''],
        resources:  new FormControl<Resource[] | null>([]),
        newResources: this.formBuilder.array([]),
        parentGeography: ['']
    }),
    politicalSystem: [''],
    newPoliticalSystem: this.formBuilder.group({
      name: ['', {
        validators: [
           Validators.minLength(3),
           Validators.maxLength(64)
        ],
        updateOn: 'blur'
        }],
        description: ['', {
          validators: [
            Validators.minLength(3),
            Validators.maxLength(1024)
          ],
          updateOn: 'blur'
        }],
        type: ['']
    })
  });

  constructor(
    private route: ActivatedRoute, 
      private router: Router, 
        private alertService: AlertService,
        private formBuilder: FormBuilder,
        private worldStorage: WorldStorageService,
        private regionService: RegionService,
        private geographyService: GeographyService,
        private resourceService: ResourceService,
        private politicalSystemService: PoliticalSystemService) {
    
    this.redirectUrl = this.router.getCurrentNavigation()?.previousNavigation?.finalUrl?.toString();
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.region = new Region();
    this.region.world = this.worldStorage.getWorld();
    const observables = {resources: this.resourceService.findByWorld(this.worldStorage.getWorld()),
                        geographies: this.geographyService.findByWorld(this.worldStorage.getWorld()),
                        politicalSystems: this.politicalSystemService.findByWorld(this.worldStorage.getWorld()),
                        jurisdictions: this.regionService.findByWorld(this.worldStorage.getWorld())};
    const results = forkJoin(observables);
    this.loading = true;
    results.subscribe(data => {
      this.loading = false;
      this.resourcesList = data.resources;
      this.geographies = data.geographies;
      this.politicalSystems = data.politicalSystems;
      this.jurisdictions = data.jurisdictions;
    });
    if (!this.isAddMode) {
      this.loading = true;
      this.regionService.findById(this.id).subscribe({
        next: data => {
            this.loading = false;
            this.region = data;
            this.form.patchValue({
              name: this.region.name,
              description: this.region.description,
              municipality: this.region.municipality,
              jurisdiction: this.region.jurisdiction?.id,
              geography: this.region.geography?.id,
              politicalSystem: this.region.politicalSystem?.id
            });
          }, error: err => {
            this.loading = false;
            this.alertService.error("Error retrieving region: " + err.error?.error);
        }
      });
    } 
  }

  async onSubmit() {
    if (this.form.valid) {
      this.loading = true;
      
      await this.getGeography().then(res => {
      const name = this.form.controls.name.value?.trim() || '';
      const description = this.form.controls.description.value?.trim() || '';
      const municipality = this.form.controls.municipality.value || '';
      const geography = this.createGeography ? res : null;
      const politicalSystem = this.createPoliticalSystem ? this.getPoliticalSystem() : null;
      this.region = {
        name: name,
        description: description,
        municipality: municipality,
        world: this.worldStorage.getWorld()
      };
      if (!this.isAddMode)
        this.region.id = this.id;

      const jurisdictionction = this.form.controls.jurisdiction.value ? this.regionService.findById(this.form.controls.jurisdiction.value) : of(new Region);   
      const geographyAction = geography != null ? this.geographyService.create(geography) : this.geographyService.findById(this.form.controls.geography.value || '');
      const politicalSystemAction = politicalSystem ? this.politicalSystemService.create(politicalSystem) : (this.form.controls.politicalSystem.value ? this.politicalSystemService.findById(this.form.controls.politicalSystem.value) : of(new PoliticalSystem()));
      const observables = {jurisdiction: jurisdictionction, geography: geographyAction, politicalSystem: politicalSystemAction};
      const results = forkJoin(observables);
      results.pipe(
        switchMap(result => {
          this.region.politicalSystem = (Number(result.politicalSystem.id) > 0 ? result.politicalSystem : undefined);
          this.region.jurisdiction = (Number(result.jurisdiction.id) > 0 ? result.jurisdiction : undefined);
          this.region.geography = result.geography;
          return this.isAddMode ? this.regionService.create(this.region) : this.regionService.update(this.region);
        }))
      .subscribe({
          next: result => {
            this.loading = false;
            const message = this.isAddMode ? 'Region saved successfully!' : 'Region updated successfully!';
            this.alertService.success(message);
            this.gotoRedirect();
          },
          error: err => {
            this.loading = false;
            const message = this.isAddMode ? 'Error creating Region: ' : 'Error updating Region: ';
            this.alertService.error(message + err.error.error);
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

  gotoRedirect() {
    this.router.navigate(['/'+this.redirectUrl]);
  }

  
  async getGeography(): Promise<Geography> {
    const geography = new Geography();
    geography.description = this.form.controls.newGeography.controls.description.value?.trim() || '';
    geography.name = this.form.controls.newGeography.controls.name.value?.trim() || '';
    geography.climate = this.form.controls.newGeography.controls.climate.value || '';
    geography.resources = this.resources;
    geography.type = this.form.controls.newGeography.controls.type.value || '';
    geography.world = this.worldStorage.getWorld();

    const observe = this.form.controls.newGeography.controls.parentGeography.value
      ? this.geographyService.findById(this.form.controls.newGeography.controls.parentGeography.value)
      : of(new Geography());

    const res = await lastValueFrom(observe.pipe(
      map(res => {
        geography.parentGeography = Number(res.id) > 0 ? res : undefined;
        return geography;
      })
    ));

    return res;
}

  getPoliticalSystem() {
    const politicalSystem = new PoliticalSystem();
    politicalSystem.description = this.form.controls.newPoliticalSystem.controls.description.value?.trim() || '';
    politicalSystem.name = this.form.controls.newPoliticalSystem.controls.name.value?.trim() || '';
    politicalSystem.type = this.form.controls.newPoliticalSystem.controls.type.value || '';
    politicalSystem.world = this.worldStorage.getWorld();
    return politicalSystem;
  }

  async createResources() {
    const resourcesFieldAsFormArray = this.resourcesFieldAsFormArray;
    const resourcesArray = this.form.get('newGeography')?.get('resources')?.value as Array<Resource>;
   
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
    return this.form.get('newGeography')?.get('newResources') as FormArray;
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
}
