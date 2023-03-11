import { Component } from '@angular/core';
import { AlertService } from 'src/app/_alert';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_module/user-management/service/auth.service';
import { ModalService } from 'src/app/_modal';
import { Profile } from '../../model/profile';
import { User } from '../../model/user';
import { StorageService } from '../../service/storage.service';
import { UserService } from '../../service/user.service';

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
    this.profile.confirmEmail = this.profile.confirmEmail.trim();
    this.profile.email = this.profile.email.trim();
    this.userService.changeEmail(this.profile).subscribe({
      next: data => {
        this.loading = false;
        this.alertService.success("Email changed successfully! Changes will be reflected soon.");
      },
      error: err => {
        this.loading = false;
        this.alertService.error("Email could not be changed: " + err.error.message);
      }
    });
  }

  onChangePassword(): void {
    this.loading = true;
    this.profile.newPassword = this.profile.newPassword.trim();
    this.profile.oldPassword = this.profile.oldPassword.trim();
    this.profile.confirmPassword = this.profile.confirmPassword.trim();
    this.authService.changePassword(this.profile).subscribe({
      next: data => {
        this.loading = false;
        this.isSuccessful = true;
        this.alertService.success("Password changed successfully!");
      },
      error: err => {
        this.loading = false;
        this.alertService.error("Password could not be changed: " + err.error.message);
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
        this.alertService.error("User cannot be deleted: " + err.error.message);
      }
    });
  }
}
