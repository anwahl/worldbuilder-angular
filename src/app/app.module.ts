import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './_component/login/login.component';
import { UserListComponent } from './_component/user-list/user-list.component';
import { UserService } from './_service/user.service';
import { WorldFormComponent } from './_component/world-form/world-form.component';
import { WorldListComponent } from './_component/world-list/world-list.component';
import { WorldService } from './_service/world.service';
import { httpInterceptorProviders } from './_helpers/http.interceptor';
import { RegisterComponent } from './_component/register/register.component';
import { NgxLoadingModule } from 'ngx-loading';
import { Validation } from './_helpers/validation';
import { PasswordPatternDirective } from './_directives/password-pattern.directive';
import { MatchPasswordDirective } from './_directives/match-password.directive';
import { MatchEmailDirective } from './_directives/match-email.directive';
import { WorldMangementComponent } from './_component/world-mangement/world-mangement.component';
import { AlertModule } from './_alert';
import { ModalComponent } from './_modal/component/modal.component';
import { ModalService } from './_modal';
import { UserProfileComponent } from './_component/user-profile/user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserListComponent,
    WorldFormComponent,
    WorldListComponent,
    RegisterComponent,
    PasswordPatternDirective,
    MatchPasswordDirective,
    MatchEmailDirective,
    WorldMangementComponent,
    ModalComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxLoadingModule.forRoot({}),
    AlertModule
  ],
  providers: [httpInterceptorProviders, Validation, UserService, WorldService, ModalService],
  bootstrap: [AppComponent]
})
export class AppModule {
  
}
