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
import { SocialClassFormComponent } from '../socialClass/social-class-form/social-class-form.component';
import { SocialClassListComponent } from '../socialClass/social-class-list/social-class-list.component';
import { PoliticalSystemFormComponent } from '../politicalSystem/political-system-form/political-system-form.component';
import { PoliticalSystemListComponent } from '../politicalSystem/political-system-list/political-system-list.component';
import { GeographyFormComponent } from '../geography/geography-form/geography-form.component';
import { GeographyListComponent } from '../geography/geography-list/geography-list.component';
import { RegionFormComponent } from '../region/region-form/region-form.component';
import { RegionListComponent } from '../region/region-list/region-list.component';


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
        path: 'socialClass',
        component: SocialClassFormComponent
      },
      {
        path: 'socialClass/:id',
        component: SocialClassFormComponent
      },
      {
        path: 'socialClasses',
        component: SocialClassListComponent
      },
      {
        path: 'politicalSystem',
        component: PoliticalSystemFormComponent
      },
      {
        path: 'politicalSystem/:id',
        component: PoliticalSystemFormComponent
      },
      {
        path: 'politicalSystems',
        component: PoliticalSystemListComponent
      },
      {
        path: 'geography',
        component: GeographyFormComponent
      },
      {
        path: 'geography/:id',
        component: GeographyFormComponent
      },
      {
        path: 'geographies',
        component: GeographyListComponent
      },
      {
        path: 'region',
        component: RegionFormComponent
      },
      {
        path: 'region/:id',
        component: RegionFormComponent
      },
      {
        path: 'regions',
        component: RegionListComponent
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
