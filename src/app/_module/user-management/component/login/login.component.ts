import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/_alert';
import { AuthService } from '../../service/auth.service';
import { StorageService } from '../../service/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  errorMessage = '';
  public loading = false;
  username: string = '';

  constructor(private authService: AuthService, private storageService: StorageService, private alertService: AlertService) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.username = this.storageService.getUser().username;
    }
  }

  onSubmit(): void {
    this.loading = true;
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe({
      next: data => {
        this.loading = false;
        this.storageService.saveUser(data);
        this.isLoggedIn = true;
        this.username = this.storageService.getUser().username;
        this.reloadPage();
      },
      error: err => {
        this.loading = false;
        this.alertService.error("Error logging in: " + err.error.message);
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
}