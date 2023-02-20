import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordPatternDirective } from 'src/app/_directives/password-pattern.directive';
import { MatchPasswordDirective } from 'src/app/_directives/match-password.directive';
import { MatchEmailDirective } from 'src/app/_directives/match-email.directive';
import { ForgotPasswordComponent } from 'src/app/_module/user-management/component/forgot-password/forgot-password.component';
import { WelcomeModule } from '../../welcome/welcome.module';
import { FormsModule } from '@angular/forms';
import { UserListComponent } from '../component/user-list/user-list.component';
import { UserProfileComponent } from '../component/user-profile/user-profile.component';
import { LoginComponent } from '../component/login/login.component';
import { RegisterComponent } from '../component/register/register.component';



@NgModule({
  declarations: [
    UserListComponent,
    UserProfileComponent,
    LoginComponent,
    RegisterComponent,
    PasswordPatternDirective,
    MatchPasswordDirective,
    MatchEmailDirective,
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    WelcomeModule
  ],
  exports: [
    UserListComponent,
    UserProfileComponent,
    LoginComponent,
    RegisterComponent,
    PasswordPatternDirective,
    MatchPasswordDirective,
    MatchEmailDirective,
    ForgotPasswordComponent
  ]
})
export class UserManagementModule { }
