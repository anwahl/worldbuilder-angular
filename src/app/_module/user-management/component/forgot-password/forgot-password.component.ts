import { Component } from '@angular/core';
import { AuthService } from 'src/app/_module/user-management/service/auth.service';
import { AlertService } from 'src/app/_alert';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from '../../model/profile';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  form: any = {
    email: null
  };

  token: String;
  email: String;
  profile: Profile;
  public loading = false;
  changePassword: Boolean;

  constructor(private authService: AuthService, private route: ActivatedRoute,
    private alertService: AlertService, private router: Router) {  }

    ngOnInit() {
      this.route.queryParams.subscribe(params => {
        this.token = params['token']; });
      this.changePassword = this.token != null;
      
      if(this.changePassword) {
        this.profile = new Profile();
      } else {
        this.email = '';
      }
    }
    
    onSubmit() {
      this.form.email = this.form.email.trim();
      this.loading = true;
      this.authService.resetPassword(this.form.email).subscribe({next: data => {
        this.loading = false;
        this.alertService.success("Email sent successfully.");
      }, error: err => {
        this.loading = false;
        this.alertService.error("Error sending email: " + err.error.message);
      }});
    }

    onResetPasswordSubmit(){
      this.loading = true;
      this.authService.savePassword(this.token, this.profile).subscribe({next: data => {
        this.loading = false;
        this.alertService.success("Password changed successfully.");
      }, error: err => {
        this.loading = false;
        this.alertService.error("Error changing password: " + err.error.message);
      }});
    }
}
