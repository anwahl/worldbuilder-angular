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
    LanguageFormComponent
  ],
  providers: [ WorldStorageService ]
})
export class WorldManagement {}
