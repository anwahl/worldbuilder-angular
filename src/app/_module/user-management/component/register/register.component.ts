import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/_alert';
import { ModalService } from 'src/app/_modal';
import { User } from '../../model/user';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User;
  isSuccessful = false;
  public loading = false;
  agreementForm: FormGroup;

  constructor(private authService: AuthService, 
    private alertService: AlertService, 
    protected modalService: ModalService) {
    this.user = new User(); 
  }

  ngOnInit(): void {
    this.agreementForm = new FormGroup({
      'privacy': new FormControl(false, Validators.requiredTrue),
      'terms': new FormControl(false, Validators.requiredTrue)
    });
  }

  onSubmit(): void {
    if (this.agreementForm.get('privacy')?.getRawValue() == true
      && this.agreementForm.get('terms')?.getRawValue() == true) {
      this.loading = true;
      this.authService.register(this.user).subscribe({
        next: data => {
          this.loading = false;
          this.isSuccessful = true;
          this.alertService.success(this.user.username + " was registered successfully!");
        },
        error: err => {
          this.loading = false;
          this.alertService.error("Error with registration: " + err.error.message);
        }
      });
    }
  }
}