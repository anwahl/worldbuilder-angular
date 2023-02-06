import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { User } from '../_model/user';

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

  logout(): Observable<any> {
    return this.http.post(environment.apiUrl + '/auth/signout', { });
  }
}