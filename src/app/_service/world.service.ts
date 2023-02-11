import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { World } from '../_model/world';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { User } from '../_model/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class WorldService {

  private worldsPublicUrl: string;
  private worldsByUserUrl: string;
  private worldsUrl: string;

  constructor(private http: HttpClient) {
    this.worldsUrl = environment.apiUrl + '/world';
    this.worldsPublicUrl = environment.apiUrl + '/world/public';
    this.worldsByUserUrl = environment.apiUrl + '/world/user/';
  }

  public findAll(): Observable<World[]> {
    return this.http.get<World[]>(this.worldsPublicUrl);
  }

  public findById(id: String): Observable<World> {
    return this.http.get<World>(this.worldsUrl + "/" + id);
  }

  public findByUser(user: User): Observable<World[]> {
    return this.http.get<World[]>(this.worldsByUserUrl + user.id);
  }

  public create(world: World) {
    if (world.isPrivate == null) {
      world.isPrivate = false;
    }
    return this.http.post<World>(this.worldsUrl, world, httpOptions);
  }

  public update(world: World) {
    if (world.isPrivate == null) {
      world.isPrivate = false;
    }
    return this.http.put<World>(this.worldsUrl + "/" + world.id, world, httpOptions);
  }

  public delete(world: World) {
    return this.http.delete(this.worldsUrl + "/" + world.id);
  }
}