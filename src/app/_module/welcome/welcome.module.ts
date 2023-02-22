import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxLoadingModule } from 'ngx-loading';
import { AlertModule } from 'src/app/_alert';
import { ModalComponent } from 'src/app/_modal/component/modal.component';
import { PageNotFoundComponent } from 'src/app/_component/page-not-found/page-not-found.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [
    ModalComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    NgxLoadingModule,
    AlertModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatCardModule
  ],
  exports: [
    ModalComponent,
    NgxLoadingModule,
    AlertModule,
    PageNotFoundComponent,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatCardModule
  ],
})
export class WelcomeModule { }
