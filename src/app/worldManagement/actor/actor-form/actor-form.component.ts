import { Component } from '@angular/core';
import { AbstractControlOptions, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/_alert';
import { World } from 'src/app/_model/world';
import { Actor } from '../../model/actor';
import { Language } from '../../model/language';
import { Race } from '../../model/race';
import { RaceService } from '../../race/service/race.service';
import { WorldStorageService } from '../../service/world-storage.service';
import { raceValidator } from '../../validators/raceValidator';
import { ActorService } from '../service/actor.service';
import { forkJoin, switchMap, Observable } from 'rxjs';
import { LanguageService } from '../../language/service/language.service';


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
  race: Race;
  createRace = false;
  languagesList: Array<Language>;
  newLanguages: any[] = [];
  languages: Array<Language> = [];

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
 }, {
        validators: [raceValidator()]
    } as AbstractControlOptions );


  constructor(
    private route: ActivatedRoute, 
      private router: Router, 
        private actorService: ActorService, 
        private alertService: AlertService,
        private formBuilder: FormBuilder,
        private worldStorage: WorldStorageService,
        private raceService: RaceService,
        private languageService: LanguageService) {
    
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
          this.raceService.findByWorld(this.worldStorage.getWorld()).pipe(
            switchMap(data => {
              this.races = data;
              return this.languageService.findByWorld(this.worldStorage.getWorld())
            })).subscribe(data => {
              this.loading = false;
              this.languagesList = data;
          });
          this.actor = actorData;
          this.form.patchValue({
            firstName: this.actor.firstName,
            lastName: this.actor.lastName,
            description: this.actor.description,
            race: this.actor.race?.id,
            languages: this.actor.languages
          });

        },
        error: actorErr => {
          this.loading = false;
          this.alertService.error("Error retrieving actor: " + actorErr.error.error);
        }
      });
    } {
      this.loading = true;
      this.raceService.findByWorld(this.worldStorage.getWorld()).pipe(
        switchMap(data => {
          this.races = data;
          return this.languageService.findByWorld(this.worldStorage.getWorld())
        })).subscribe(data => {
          this.loading = false;
          this.languagesList = data;
      });
    }
  }


  async onSubmit() {
    this.loading = true;
    const firstName = this.form.controls.firstName.value || '';
    const lastName = this.form.controls.lastName.value || '';
    const description = this.form.controls.description.value || '';
    const race = this.createRace ? this.getRace() : null;
    this.actor = {
      firstName: firstName,
      lastName: lastName,
      description: description,
      world: this.worldStorage.getWorld(),
      languages: this.languages
    };
  
    const raceAction = race ? this.raceService.create(race) : this.raceService.findById(this.form.controls.race.value || '');
    await this.createLanguages().then(res => {
      
      raceAction.pipe(
        switchMap(result => {
          this.actor.race = result;
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
  }
  
  getRace() {
    const race = new Race();
    race.description = this.form.controls.newRace.controls.description.value || '';
    race.name = this.form.controls.newRace.controls.name.value || '';
    race.trait = this.form.controls.newRace.controls.trait.value || '';
    race.world = this.worldStorage.getWorld();
    return race;
  }

  async createLanguages() {
    const languagesFieldAsFormArray = this.languagesFieldAsFormArray;
    const languagesArray = this.form.get('languages')?.value as Array<Language>;

    if (languagesFieldAsFormArray.length) {
      const observables: Observable<Language> = languagesFieldAsFormArray.controls.map((control: { controls: { name: { value: string; }; description: { value: string; }; }; }, index: any) => {
        const language = new Language();
        language.name = control.controls.name.value;
        language.description = control.controls.description.value;
        language.world = this.worldStorage.getWorld();
        return this.languageService.create(language);
      });
      const results = forkJoin(observables);
      results.subscribe(lng => this.languages = this.languages.concat(lng));
    }
  
    if (languagesArray.length) {
      const observables = languagesArray.map((lng, index) => {
        this.languages.push(lng);
      });
      forkJoin(observables);
    }
  }



  compareObjects(o1: any, o2: any): boolean {
    return o1.segName === o2.segName && o1.id === o2.id;
  }

  /*async onSubmit() {
    this.loading = true;
    if (this.createRace) {
      this.race = new Race();
      this.race.description = this.form.controls.newRace.controls.description.value || '';
      this.race.name = this.form.controls.newRace.controls.name.value || '';
      this.race.trait = this.form.controls.newRace.controls.trait.value || '';
      this.race.world = this.worldStorage.getWorld();
    } 
    this.actor.firstName = this.form.controls.firstName.value || '';
    this.actor.lastName = this.form.controls.firstName.value || '';
    this.actor.description = this.form.controls.firstName.value || '';
    this.actor.world = this.worldStorage.getWorld();
    for (let i = 0; i < this.languagesFieldAsFormArray.length; i++) {
      let language = new Language();
      language.name = this.languagesFieldAsFormArray.at(i).controls.name;
      language.description = this.languagesFieldAsFormArray.at(i).controls.description;
      await this.languageService.create(language).subscribe({
        next: result => {
          this.languages.push(result);
          for (let i = 0; i < this.form.controls.languages.length; i++) {
            let language = new Language();
            let languagesArray = this.form.get('languages') as FormArray;
            language.name = languagesArray.at(i).value.name;
            language.description = languagesArray.at(i).value.description
            this.languageService.create(language).subscribe({
              next: result => {
              this.languages.push(result);
              this.actor.languages = this.languages;
            }});
          }
        }
      })
    }
    if (this.languagesFieldAsFormArray.length == 0) {
      for (let i = 0; i < this.form.controls.languages.length; i++) {
        let language = new Language();
        let languagesArray = this.form.get('languages') as FormArray;
        language.name = languagesArray.at(i).value.name;
        language.description = languagesArray.at(i).value.description
        await this.languageService.create(language).subscribe({
          next: result => {
          this.languages.push(result);
          this.actor.languages = this.languages;
        }});
      }
    }
    if (this.isAddMode) {
      if (this.createRace) {
        this.raceService.create(this.race).subscribe({
          next: result => { 
            this.actor.race = result;
            this.actorService.create(this.actor).subscribe({
              next: result => { 
                this.loading = false;
                this.alertService.success("Actor saved successfully!");
                this.gotoRedirect() },
              error: err => {
                this.loading = false;
                this.alertService.error("Error creating actor: " + err.error.error);
              }});
            this.alertService.success("Race saved successfully!");
          }, error: err => {
            this.alertService.error("Error creating race: " + err.error.error);
          }});
    } else {
        this.raceService.findById(this.form.controls.race.value || '').subscribe({
          next: result => {
            this.actor.race = result;
            this.actorService.create(this.actor).subscribe({
              next: result => {
                this.loading = false;
                this.alertService.success("Actor saved successfully!");
                this.gotoRedirect()
              },
              error: err => {
                this.loading = false;
                this.alertService.error("Error creating actor: " + err.error.error);
              }
            });
          }, error: err => {
          this.alertService.error("Error finding race: " + err.error.error);
        }});
      }
    } else {
      if (this.createRace) {
        this.raceService.create(this.race).subscribe({
          next: result => { 
            this.actor.race = result;
            this.actorService.update(this.actor).subscribe({
              next: result => { 
                this.loading = false;
                this.alertService.success("Actor updated successfully!");
                this.gotoRedirect() },
              error: err => {
                this.loading = false;
                this.alertService.error("Error updating actor: " + err.error.error);
              }});
            this.alertService.success("Race saved successfully!");
          }, error: err => {
            this.alertService.error("Error creating race: " + err.error.error);
          }});
    } else {
      this.raceService.findById(this.form.controls.race.value || '').subscribe({
        next: result => {
          this.actor.race = result;
          this.actorService.update(this.actor).subscribe({
            next: result => { 
              this.loading = false;
              this.alertService.success("Actor updated successfully!");
              this.gotoRedirect() },
            error: err => {
              this.loading = false;
              this.alertService.error("Error updating actor: " + err.error.error);
            }});
          }, error: err => {
            this.alertService.error("Error finding race: " + err.error.error);
          }});
      }
    }
  }*/

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
