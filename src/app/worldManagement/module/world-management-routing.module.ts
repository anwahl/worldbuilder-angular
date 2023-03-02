import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from 'src/app/_component/page-not-found/page-not-found.component';
import { RaceFormComponent } from 'src/app/worldManagement/race/race-form/race-form.component';
import { WorldManagementComponent } from 'src/app/worldManagement/component/world-management.component';
import { RaceListComponent } from '../race/race-list/race-list.component';
import { WorldHomeComponent } from '../home/world-home/world-home.component';
import { ActorFormComponent } from '../actor/actor-form/actor-form.component';
import { ActorListComponent } from '../actor/actor-list/actor-list.component';
import { LanguageFormComponent } from '../language/language-form/language-form.component';
import { LanguageListComponent } from '../language/language-list/language-list.component';
import { ReligionFormComponent } from '../religion/religion-form/religion-form.component';
import { ReligionListComponent } from '../religion/religion-list/religion-list.component';


const worldManagementRoutes: Routes = [
  {
    path: '',
    component: WorldManagementComponent,
    children: [
      {
        path: 'home',
        component: WorldHomeComponent
      },
      {
        path: 'race',
        component: RaceFormComponent
      },
      {
        path: 'race/:id',
        component: RaceFormComponent
      },
      {
        path: 'races',
        component: RaceListComponent
      },
      {
        path: 'actor',
        component: ActorFormComponent
      },
      {
        path: 'actor/:id',
        component: ActorFormComponent
      },
      {
        path: 'actors',
        component: ActorListComponent
      },
      {
        path: 'language',
        component: LanguageFormComponent
      },
      {
        path: 'language/:id',
        component: LanguageFormComponent
      },
      {
        path: 'languages',
        component: LanguageListComponent
      },
      {
        path: 'religion',
        component: ReligionFormComponent
      },
      {
        path: 'religion/:id',
        component: ReligionFormComponent
      },
      {
        path: 'religions',
        component: ReligionListComponent
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: '**',
        component: PageNotFoundComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(worldManagementRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class WorldManagementRoutingModule { }
