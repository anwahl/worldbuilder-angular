import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertComponent } from '../component/alert.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    imports: [CommonModule,MatIconModule,MatButtonModule],
    declarations: [AlertComponent],
    exports: [AlertComponent]
})
export class AlertModule { }