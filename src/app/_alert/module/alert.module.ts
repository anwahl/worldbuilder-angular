import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertComponent } from '../component/alert.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
    imports: [CommonModule,MatIconModule,MatButtonModule,MatSnackBarModule],
    declarations: [AlertComponent],
    exports: [AlertComponent]
})
export class AlertModule { }