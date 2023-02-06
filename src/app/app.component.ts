import { Component } from '@angular/core';
import { AuthService } from './_service/auth.service';
import { StorageService } from './_service/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Worldbuilder';
  private roles: string[] = [];
  isLoggedIn = false;
  username?: string;

  constructor(private storageService: StorageService, private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;

      this.username = user.username;
    }
  }

  logout(): void {
    this.authService.logout();
    this.storageService.clean();
    window.location.reload();
  }
}
