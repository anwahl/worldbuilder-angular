import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './_component/user-list/user-list.component';
import { LoginComponent } from './_component/login/login.component';
import { WorldListComponent } from './_component/world-list/world-list.component';
import { WorldFormComponent } from './_component/world-form/world-form.component';
import { WorldMangementComponent } from './_component/world-mangement/world-mangement.component';
import { RegisterComponent } from './_component/register/register.component';
import { UserProfileComponent } from './_component/user-profile/user-profile.component';

const routes: Routes = [
  { path: 'users', component: UserListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'worlds', component: WorldListComponent },
  { path: 'world', component: WorldFormComponent },
  { path: 'world/:id', component: WorldFormComponent },
  { path: 'world/manage/:id', component: WorldMangementComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: UserProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }