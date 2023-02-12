import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/_alert';
import { User } from '../../_model/user';
import { AuthService } from '../../_service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User;
  isSuccessful = false;
  public loading = false;

  constructor(private authService: AuthService, private alertService: AlertService) {
    this.user = new User(); 
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.loading = true;
    this.authService.register(this.user).subscribe({
      next: data => {
        this.loading = false;
        this.isSuccessful = true;
        this.alertService.success(this.user.username + " was registered successfully!");
      },
      error: err => {
        this.loading = false;
        this.alertService.error("Error with registration: " + err.message);
      }
    });
  }
}