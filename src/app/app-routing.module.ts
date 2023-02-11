import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { LoginComponent } from './login/login.component';
import { WorldListComponent } from './world-list/world-list.component';
import { WorldFormComponent } from './world-form/world-form.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'users', component: UserListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'worlds', component: WorldListComponent },
  { path: 'world', component: WorldFormComponent },
  { path: 'world/:id', component: WorldFormComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }