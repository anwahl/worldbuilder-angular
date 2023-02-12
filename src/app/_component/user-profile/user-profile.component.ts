import { Component } from '@angular/core';
import { AlertService } from 'src/app/_alert';
import { Router } from '@angular/router';
import { Profile } from 'src/app/_model/profile';
import { User } from 'src/app/_model/user';
import { AuthService } from 'src/app/_service/auth.service';
import { StorageService } from 'src/app/_service/storage.service';
import { UserService } from 'src/app/_service/user.service';
import { ModalService } from 'src/app/_modal';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  user: User;
  profile: Profile;
  isSuccessful = false;
  public loading = false;
  
  constructor(private authService: AuthService, private storageService: StorageService,
    private alertService: AlertService, private userService: UserService, 
    private router: Router, protected modalService: ModalService) {
    this.user = this.storageService.getUser();
    this.profile = new Profile();
    this.profile.userId = this.user.id;
    this.profile.email = this.user.email;
    this.profile.username = this.user.username;
  }

  ngOnInit(): void {
  }

  onChangeEmail(): void {
    this.loading = true;
    this.userService.changeEmail(this.profile).subscribe({
      next: data => {
        this.loading = false;
        this.alertService.success("Email changed successfully! Changes will be reflected soon.");
      },
      error: err => {
        this.loading = false;
        this.alertService.error("Email could not be changed: " + err.message);
      }
    });
  }

  onChangePassword(): void {
    this.loading = true;
    this.authService.changePassword(this.profile).subscribe({
      next: data => {
        this.loading = false;
        this.isSuccessful = true;
        this.alertService.success("Password changed successfully!");
      },
      error: err => {
        this.loading = false;
        this.alertService.error("Password could not be changed: " + err.message);
      }
    });
  }

  deleteUser(user: User): void {
    this.modalService.close()
    this.loading = true;
    this.userService.delete(user).subscribe({
      next: data => {
        this.loading = false;
        this.isSuccessful = true;
        this.authService.logout();
        this.storageService.clean();
        window.location.reload();
        this.alertService.success("Account successfully deleted.");
      },
      error: err => {
        this.loading = false;
        this.alertService.error("User cannot be deleted: " + err.message);
      }
    });
  }
}
