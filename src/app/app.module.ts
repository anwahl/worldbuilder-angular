import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WorldFormComponent } from './_component/world-form/world-form.component';
import { WorldListComponent } from './_component/world-list/world-list.component';
import { WorldService } from './_service/world.service';
import { httpInterceptorProviders } from './_helpers/http.interceptor';
import { Validation } from './_helpers/validation';
import { WorldManagementComponent } from './worldManagement/component/world-management.component';
import { ModalService } from './_modal';
import { RaceService } from './worldManagement/race/service/race.service';
import { RouterModule } from '@angular/router';
import { WelcomeModule } from './_module/welcome/welcome.module';
import { UserManagementModule } from './_module/user-management/module/user-management.module';
import { UserService } from './_module/user-management/service/user.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    WorldFormComponent,
    WorldListComponent,
    WorldManagementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    WelcomeModule,
    UserManagementModule,
    BrowserAnimationsModule
  ],
  providers: [httpInterceptorProviders, Validation, UserService, WorldService, ModalService, RaceService],
  bootstrap: [AppComponent]
})
export class AppModule {
  
}
