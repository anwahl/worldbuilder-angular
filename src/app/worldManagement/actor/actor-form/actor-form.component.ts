import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/_alert';
import { World } from 'src/app/_model/world';
import { Actor } from '../../model/actor';
import { Language } from '../../model/language';
import { Race } from '../../model/race';
import { RaceService } from '../../race/service/race.service';
import { WorldStorageService } from '../../service/world-storage.service';
import { ActorService } from '../service/actor.service';
import { forkJoin, switchMap, Observable } from 'rxjs';
import { of, map, lastValueFrom } from 'rxjs';
import { LanguageService } from '../../language/service/language.service';
import { Religion } from '../../model/religion';
import { ReligionService } from '../../religion/service/religion.service';
import { SocialClass } from '../../model/social-class';
import { SocialClassService } from '../../socialClass/service/social-class.service';
import { RegionService } from '../../region/service/region.service';
import { Region } from '../../model/region';


@Component({
  selector: 'app-actor-form',
  templateUrl: './actor-form.component.html',
  styleUrls: ['./actor-form.component.css',]
})
export class ActorFormComponent {
  actor: Actor;
  world: World;
  id: string;
  worldId: string;
  isAddMode: boolean;
  public loading = false;
  redirectUrl: string | undefined;
  races: Array<Race>;
  createRace = false;
  religions: Array<Religion>;
  createReligion = false;
  socialClasses: Array<SocialClass>;
  createSocialClass = false;
  languagesList: Array<Language>;
  newLanguages: any[] = [];
  languages: Array<Language> = [];
  regions: Array<Region>;

  form = this.formBuilder.group({
    firstName: ['', {
        validators: [
           Validators.required,
           Validators.minLength(3),
           Validators.maxLength(64)
        ],
        updateOn: 'blur'
    }],
    lastName: ['', {
      validators: [
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
    race: ['', [] ],
    newRace: this.formBuilder.group({
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
      trait: ['', {
        validators: [
            Validators.minLength(3),
            Validators.maxLength(512)
        ],
        updateOn: 'blur'
      }],
    }),
      languages: new FormControl<Language[] | null>([]),
      newLanguages: this.formBuilder.array([]),

      religion: ['', [] ],
      newReligion: this.formBuilder.group({
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
      }),
      socialClass: ['', [] ],
      newSocialClass: this.formBuilder.group({
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
        region: [''],
        race: ['']
      }),
 });


  constructor(
    private route: ActivatedRoute, 
      private router: Router, 
        private actorService: ActorService, 
        private alertService: AlertService,
        private formBuilder: FormBuilder,
        private worldStorage: WorldStorageService,
        private raceService: RaceService,
        private religionService: ReligionService,
        private socialClassService: SocialClassService,
        private languageService: LanguageService,
        private regionService: RegionService) {
    
    this.redirectUrl = this.router.getCurrentNavigation()?.previousNavigation?.finalUrl?.toString();
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.actor = new Actor();
    this.actor.world = this.worldStorage.getWorld();

    if (!this.isAddMode) {
      this.loading = true;
      this.actorService.findById(this.id).subscribe({
        next: actorData => {
          this.loading = true;
          const observables = {
            races: this.raceService.findByWorld(this.worldStorage.getWorld()),
            religions: this.religionService.findByWorld(this.worldStorage.getWorld()),
            socialClasses: this.socialClassService.findByWorld(this.worldStorage.getWorld()),
            languages: this.languageService.findByWorld(this.worldStorage.getWorld()),
            regions: this.regionService.findByWorld(this.worldStorage.getWorld())
          };
          const results = forkJoin(observables);
          results.subscribe(data => {
            this.loading = false;
            this.races = data.races;
            this.religions = data.religions;
            this.languagesList = data.languages;
            this.socialClasses = data.socialClasses;
            this.regions = data.regions;
          });
          this.actor = actorData;
          this.form.patchValue({
            firstName: this.actor.firstName,
            lastName: this.actor.lastName,
            description: this.actor.description,
            race: this.actor.race?.id,
            languages: this.actor.languages,
            religion: this.actor.religion?.id,
            socialClass: this.actor.socialClass?.id
          });

        },
        error: actorErr => {
          this.loading = false;
          this.alertService.error("Error retrieving actor: " + actorErr.error.error);
        }
      });
    } {
      this.loading = true;
      const observables = {races: this.raceService.findByWorld(this.worldStorage.getWorld()),
                           religions: this.religionService.findByWorld(this.worldStorage.getWorld()),
                           languages: this.languageService.findByWorld(this.worldStorage.getWorld()),
                           socialClasses: this.socialClassService.findByWorld(this.worldStorage.getWorld()),
                           regions: this.regionService.findByWorld(this.worldStorage.getWorld()) };
      const results = forkJoin(observables);
      results.subscribe(data => {
          this.loading = false;
          this.races = data.races;
          this.religions = data.religions;
          this.languagesList = data.languages;
          this.socialClasses = data.socialClasses;
          this.regions = data.regions;
      });
    }
  }

  async onSubmit() {
    if (this.form.valid) {
      this.loading = true;
      const firstName = this.form.controls.firstName.value?.trim() || '';
      const lastName = this.form.controls.lastName.value?.trim() || '';
      const description = this.form.controls.description.value?.trim() || '';
      const race = this.createRace ? this.getRace() : null;
      const religion = this.createReligion ? this.getReligion() : null;
      const socialClass = this.createSocialClass ? await this.getSocialClass() : null;
      this.actor = {
        firstName: firstName,
        lastName: lastName,
        description: description,
        world: this.worldStorage.getWorld(),
        languages: this.languages
      };
    
      const raceAction = race ? this.raceService.create(race) : this.raceService.findById(this.form.controls.race.value || '');
      const religionAction = religion ? this.religionService.create(religion) : (this.form.controls.religion.value ? this.religionService.findById(this.form.controls.religion.value) : of(new Religion()));
      const socialClassAction = socialClass ? this.socialClassService.create(socialClass) : (this.form.controls.socialClass.value ? this.socialClassService.findById(this.form.controls.socialClass.value) : of(new SocialClass()));
      const observables = {race: raceAction,
                          religion: religionAction,
                          socialClass: socialClassAction};
      const results = forkJoin(observables);
      await this.createLanguages().then(res => {
        results.pipe(
          switchMap(result => {
            this.actor.race = result.race;
            this.actor.religion = (Number(result.religion.id) > 0 ? result.religion : undefined);
            this.actor.socialClass = (Number(result.socialClass.id) > 0 ? result.socialClass : undefined);
            this.actor.languages = this.languages;
            if (this.isAddMode) {
              return this.actorService.create(this.actor);
            } else {
              this.actor.id = this.id;
              return this.actorService.update(this.actor);
            }
          })
        ).subscribe({
          next: result => {
            this.loading = false;
            const message = this.isAddMode ? 'Actor saved successfully!' : 'Actor updated successfully!';
            this.alertService.success(message);
            this.gotoRedirect();
          },
          error: err => {
            this.loading = false;
            const message = this.isAddMode ? 'Error creating actor: ' : 'Error updating actor: ';
            this.alertService.error(message + err.error.error);
          }
        });
      })
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
  
  getRace() {
    const race = new Race();
    race.description = this.form.controls.newRace.controls.description.value?.trim() || '';
    race.name = this.form.controls.newRace.controls.name.value?.trim() || '';
    race.trait = this.form.controls.newRace.controls.trait.value?.trim() || '';
    race.world = this.worldStorage.getWorld();
    return race;
  }

  getReligion() {
    const religion = new Religion();
    religion.description = this.form.controls.newReligion.controls.description.value?.trim() || '';
    religion.name = this.form.controls.newReligion.controls.name.value?.trim() || '';
    religion.world = this.worldStorage.getWorld();
    return religion;
  }

  async getSocialClass() {
    const socialClass = new SocialClass();
    socialClass.description = this.form.controls.newSocialClass.controls.description.value?.trim() || '';
    socialClass.name = this.form.controls.newSocialClass.controls.name.value?.trim() || '';
    socialClass.world = this.worldStorage.getWorld();

    const regionAction = this.form.controls.newSocialClass.controls.region.value
      ? this.regionService.findById(this.form.controls.newSocialClass.controls.region.value)
      : of(new Region());
    const raceACtion = this.form.controls.newSocialClass.controls.race.value
    ? this.raceService.findById(this.form.controls.newSocialClass.controls.race.value)
    : of(new Race());
    const observables = {race: raceACtion,
                         region: regionAction};
    const results = forkJoin(observables);
    const res = await lastValueFrom(results.pipe(
      map(res => {
        socialClass.region = Number(res.region.id) > 0 ? res.region : undefined;
        socialClass.race = Number(res.race.id) > 0 ? res.race : undefined;
        return socialClass;
      })
    ));

    return res;
  }

  async createLanguages() {
    const languagesFieldAsFormArray = this.languagesFieldAsFormArray;
    const languagesArray = this.form.get('languages')?.value as Array<Language>;
   
    languagesArray.forEach(lng => {
      this.languages.push(lng);
    });

    if (languagesFieldAsFormArray.length) {
      const observables: Observable<Language> = languagesFieldAsFormArray.controls.map((control: { controls: { name: { value: string; }; description: { value: string; }; }; }, index: any) => {
        const language = new Language();
        language.name = control.controls.name.value?.trim();
        language.description = control.controls.description.value?.trim();
        language.world = this.worldStorage.getWorld();
        return this.languageService.create(language);
      });
      const results = forkJoin(observables);
      results.subscribe(lng => this.languages = this.languages.concat(lng));
    }
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1.segName === o2.segName && o1.id === o2.id;
  }

  addLanguage(): void {
    this.languagesFieldAsFormArray.push(this.language());
  }

  removeLanguage(i: number): void {
    this.languagesFieldAsFormArray.removeAt(i);
  }

  get languagesFieldAsFormArray(): any {
    return this.form.get('newLanguages') as FormArray;
  }

  language(): any {
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
