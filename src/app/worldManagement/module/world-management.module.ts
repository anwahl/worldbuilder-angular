import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { RaceFormComponent } from '../race/race-form/race-form.component';
import { WorldFormComponent } from '../../_component/world-form/world-form.component';
import { WorldManagementRoutingModule } from './world-management-routing.module';
import { RaceListComponent } from '../race/race-list/race-list.component';
import { WorldHomeComponent } from '../home/world-home/world-home.component';
import { WelcomeModule } from 'src/app/_module/welcome/welcome.module';
import { WorldStorageService } from '../service/world-storage.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    WorldManagementRoutingModule,
    WelcomeModule
  ],
  declarations: [
    RaceFormComponent,
    RaceListComponent,
    WorldHomeComponent,
    WorldFormComponent
  ],
  providers: [ WorldStorageService ]
})
export class WorldManagement {}
