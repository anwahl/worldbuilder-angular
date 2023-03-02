import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { RaceFormComponent } from '../race/race-form/race-form.component';
import { WorldFormComponent } from '../../_component/world-form/world-form.component';
import { WorldManagementRoutingModule } from './world-management-routing.module';
import { RaceListComponent } from '../race/race-list/race-list.component';
import { WorldHomeComponent } from '../home/world-home/world-home.component';
import { WelcomeModule } from 'src/app/_module/welcome/welcome.module';
import { WorldStorageService } from '../service/world-storage.service';
import { CreatureFormComponent } from '../creature/creature-form/creature-form.component';
import { CreatureListComponent } from '../creature/creature-list/creature-list.component';
import { ActorListComponent } from '../actor/actor-list/actor-list.component';
import { ActorFormComponent } from '../actor/actor-form/actor-form.component';
import { LanguageListComponent } from '../language/language-list/language-list.component';
import { LanguageFormComponent } from '../language/language-form/language-form.component';
import { ReligionFormComponent } from '../religion/religion-form/religion-form.component';
import { ReligionListComponent } from '../religion/religion-list/religion-list.component';
import { SocialClassFormComponent } from '../socialClass/social-class-form/social-class-form.component';
import { SocialClassListComponent } from '../socialClass/social-class-list/social-class-list.component';
import { EitherOrRaceCheckDirective } from '../../_directives/either-or-race-check-directive';
import { EitherOrGenericCheckDirective } from 'src/app/_directives/either-or-generic-check-directive';
import { RequiredIfGenericDirective } from 'src/app/_directives/required-if-generic-directive';
import { EitherOrArrayCheckDirective } from 'src/app/_directives/either-or-array-check-directive';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    WorldManagementRoutingModule,
    WelcomeModule
  ],
  declarations: [
    RaceFormComponent,
    RaceListComponent,
    WorldHomeComponent,
    WorldFormComponent,
    CreatureFormComponent,
    CreatureListComponent,
    ActorListComponent,
    ActorFormComponent,
    LanguageListComponent,
    LanguageFormComponent,
    ReligionFormComponent,
    ReligionListComponent,
    SocialClassFormComponent,
    SocialClassListComponent,
    EitherOrRaceCheckDirective,
    EitherOrGenericCheckDirective,
    RequiredIfGenericDirective,
    EitherOrArrayCheckDirective
  ],
  providers: [ WorldStorageService ]
})
export class WorldManagement {}
