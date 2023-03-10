import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Alert, AlertType, AlertOptions } from '../model/alert.model';

@Injectable({ providedIn: 'root' })
export class AlertService {
    private subject = new Subject<Alert>();
    private defaultId = 'default-alert';

    constructor(private _snackBar: MatSnackBar) {}

    // enable subscribing to alerts observable
    onAlert(id = this.defaultId): Observable<Alert> {
        return this.subject.asObservable().pipe(filter(x => x && x.id === id));
    }

    // convenience methods
    success(message: string, options?: AlertOptions) {
        let config = new MatSnackBarConfig();
        config.panelClass = "wb-alert-success";
        this._snackBar.open(message, "Close", config);
        //this.alert(new Alert({ ...options, type: AlertType.Success, message }));
    }

    error(message: string, options?: AlertOptions) {
        let config = new MatSnackBarConfig();
        config.panelClass = "wb-alert-error";
        this._snackBar.open(message, "Close", config);
        // this.alert(new Alert({ ...options, type: AlertType.Error, message }));
    }

    info(message: string, options?: AlertOptions) {
        let config = new MatSnackBarConfig();
        config.panelClass = "wb-alert-info";
        this._snackBar.open(message, "Close", config);
        //this.alert(new Alert({ ...options, type: AlertType.Info, message }));
    }

    warn(message: string, options?: AlertOptions) {
        let config = new MatSnackBarConfig();
        config.panelClass = "wb-alert-warn";
        this._snackBar.open(message, "Close", config);
        //this.alert(new Alert({ ...options, type: AlertType.Warning, message }));
    }

    // main alert method    
    alert(alert: Alert) {
        alert.id = alert.id || this.defaultId;
        this.subject.next(alert);
    }

    // clear alerts
    clear(id = this.defaultId) {
        this.subject.next(new Alert({ id }));
    }
}