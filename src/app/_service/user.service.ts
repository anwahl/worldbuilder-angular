import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../_model/user';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { Profile } from '../_model/profile';
import { deleteOptions, getOptions, postOptions, putOptions } from '../_model/http-options';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private usersUrl: string;

  private signupUrl: string;

  private signinUrl: string;

  private deleteUserUrl: string;
  
  private changeEmailUrl: string;

  constructor(private http: HttpClient) {
    this.usersUrl = environment.apiUrl + '/users';
    this.signupUrl = environment.apiUrl + '/auth/signup';
    this.signinUrl = environment.apiUrl + '/auth/signin';
    this.deleteUserUrl = environment.apiUrl + '/auth/deleteUser';
    this.changeEmailUrl = environment.apiUrl + '/auth/changeEmail';
  }

  public findAll(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl, getOptions);
  }

  public signup(user: User) {
    user.role = ["USER"];
    return this.http.post<User>(this.signupUrl, user, postOptions);
  }
  
  public signin(user: User) {
    return this.http.post<User>(this.signinUrl, user, postOptions);
  }

  public delete(user: User) {
    return this.http.delete<User>(this.deleteUserUrl + "/" + user.id, deleteOptions);
  }

  public changeEmail(profile: Profile) {
    return this.http.put<User>(this.changeEmailUrl + "/" + profile.userId, profile, putOptions);
  }
}
