import { Component, OnInit } from '@angular/core';
import { User } from '../_model/user';
import { AuthService } from '../_service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService) {
    this.user = new User(); 
  }

  ngOnInit(): void {
  }

  onSubmit(): void {

    this.authService.register(this.user).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        this.errorMessage = err.message;
        this.isSignUpFailed = true;
      }
    });
  }
}