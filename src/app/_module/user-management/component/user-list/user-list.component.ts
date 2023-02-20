import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[];
  public loading = false;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.loading = true;
    this.userService.findAll().subscribe(data => {
      this.loading = false;
      this.users = data;
    });
  }
}