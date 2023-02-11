import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../_model/user';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private usersUrl: string;

  private signupUrl: string;

  private signinUrl: string;

  

  constructor(private http: HttpClient) {
    this.usersUrl = environment.apiUrl + '/users';
    this.signupUrl = environment.apiUrl + '/auth/signup';
    this.signinUrl = environment.apiUrl + '/auth/signin';
  }

  public findAll(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  public signup(user: User) {
    user.role = ["USER"];
    return this.http.post<User>(this.signupUrl, user);
  }

  
  public signin(user: User) {
    return this.http.post<User>(this.signinUrl, user);
  }
}