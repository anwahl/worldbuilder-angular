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
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { NoWhitespaceDirective } from 'src/app/_directives/no-whitespace-directive';





@NgModule({
  declarations: [
    ModalComponent,
    PageNotFoundComponent,
    NoWhitespaceDirective
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
    MatCardModule,
    MatMenuModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatSelectModule,
    MatDividerModule
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
    MatCardModule,
    MatMenuModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatSelectModule,
    MatDividerModule,
    NoWhitespaceDirective
  ],
})
export class WelcomeModule { }
