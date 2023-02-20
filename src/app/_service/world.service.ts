import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { World } from '../_model/world';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { deleteOptions, getOptions, postOptions, putOptions } from '../_model/http-options';
import { User } from '../_module/user-management/model/user';

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
    return this.http.get<World[]>(this.worldsPublicUrl, getOptions);
  }

  public findById(id: String): Observable<World> {
    return this.http.get<World>(this.worldsUrl + "/" + id, getOptions);
  }

  public findByUser(user: User): Observable<World[]> {
    return this.http.get<World[]>(this.worldsByUserUrl + user.id, getOptions);
  }

  public create(world: World) {
    if (world.isPrivate == null) {
      world.isPrivate = false;
    }
    return this.http.post<World>(this.worldsUrl, world, postOptions);
  }

  public update(world: World) {
    if (world.isPrivate == null) {
      world.isPrivate = false;
    }
    return this.http.put<World>(this.worldsUrl + "/" + world.id, world, putOptions);
  }

  public delete(world: World) {
    return this.http.delete(this.worldsUrl + "/" + world.id, deleteOptions);
  }
}
