import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { User } from '../_model/user';
import { Profile } from '../_model/profile';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      environment.apiUrl + '/auth/signin',
      {
        username,
        password,
      },
      httpOptions
    );
  }

  register(user: User): Observable<any> {
    return this.http.post(environment.apiUrl + '/auth/signup', user, httpOptions);
  }

  changePassword(profile: Profile,): Observable<any> {
    return this.http.put(environment.apiUrl + '/auth/changePassword/' + profile.userId, profile, httpOptions);
  }

  logout(): Observable<any> {
    return this.http.post(environment.apiUrl + '/auth/signout', { });
  }
}