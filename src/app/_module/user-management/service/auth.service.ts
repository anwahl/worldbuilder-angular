import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { postOptions, putOptions } from '../../../_model/http-options';
import { User } from '../model/user';
import { Profile } from '../model/profile';

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
      postOptions
    );
  }

  register(user: User): Observable<any> {
    return this.http.post(environment.apiUrl + '/auth/signup', user, postOptions);
  }

  changePassword(profile: Profile): Observable<any> {
    return this.http.put(environment.apiUrl + '/auth/changePassword/' + profile.userId, profile, putOptions);
  }

  logout(): Observable<any> {
    return this.http.post(environment.apiUrl + '/auth/signout', postOptions);
  }

  resetPassword(email: String): Observable<any> {
    return this.http.post(environment.apiUrl + '/auth/resetPassword/' + email, postOptions);
  }

  savePassword(token:String, profile: Profile): Observable<any> {
    return this.http.post(environment.apiUrl + '/auth/savePassword/' + token, profile, postOptions);
  }
}