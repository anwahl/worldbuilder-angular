import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorldListComponent } from './_component/world-list/world-list.component';
import { WorldFormComponent } from './_component/world-form/world-form.component';
import { ForgotPasswordComponent } from './_module/user-management/component/forgot-password/forgot-password.component';
import { UserListComponent } from './_module/user-management/component/user-list/user-list.component';
import { LoginComponent } from './_module/user-management/component/login/login.component';
import { RegisterComponent } from './_module/user-management/component/register/register.component';
import { UserProfileComponent } from './_module/user-management/component/user-profile/user-profile.component';
import { WelcomeComponent } from './_component/welcome/welcome.component';
import { PageNotFoundComponent } from './_component/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'users', component: UserListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'worlds', component: WorldListComponent },
  { path: 'world', component: WorldFormComponent },
  { path: 'world/:id', component: WorldFormComponent },
  { path: 'world/manage/:id', loadChildren: () => import('./worldManagement/module/world-management.module').then(m => m.WorldManagement), data: { preload: true }},
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'resetPassword', component: ForgotPasswordComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'resetPassword/:token', component: ForgotPasswordComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }