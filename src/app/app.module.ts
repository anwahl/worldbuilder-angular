import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserService } from './_service/user.service';
import { WorldFormComponent } from './world-form/world-form.component';
import { WorldListComponent } from './world-list/world-list.component';
import { WorldService } from './_service/world.service';
import { httpInterceptorProviders } from './_helpers/http.interceptor';
import { RegisterComponent } from './register/register.component';
import { StorageService } from './_service/storage.service';
import { AuthService } from './_service/auth.service';
import { NgxLoadingModule } from 'ngx-loading';
import { Validation } from './_helpers/validation';
import { PasswordPatternDirective } from './_directives/password-pattern.directive';
import { MatchPasswordDirective } from './_directives/match-password.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserListComponent,
    WorldFormComponent,
    WorldListComponent,
    RegisterComponent,
    PasswordPatternDirective,
    MatchPasswordDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxLoadingModule.forRoot({})
  ],
  providers: [httpInterceptorProviders, Validation, UserService, WorldService],
  bootstrap: [AppComponent]
})
export class AppModule {
  
}
