import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from 'src/app/_component/page-not-found/page-not-found.component';
import { RaceFormComponent } from 'src/app/worldManagement/race/race-form/race-form.component';
import { WorldManagementComponent } from 'src/app/worldManagement/component/world-management.component';
import { RaceListComponent } from '../race/race-list/race-list.component';
import { WorldHomeComponent } from '../home/world-home/world-home.component';


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
