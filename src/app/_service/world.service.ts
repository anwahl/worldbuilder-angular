import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { World } from '../_model/world';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class WorldService {

  private worldsPublicUrl: string;
  private worldsUrl: string;

  constructor(private http: HttpClient) {
    this.worldsUrl = environment.apiUrl + '/world';
    this.worldsPublicUrl = environment.apiUrl + '/world/public';
  }

  public findAll(): Observable<World[]> {
    return this.http.get<World[]>(this.worldsPublicUrl);
  }

  public create(world: World) {
    if (world.isPrivate == null) {
      world.isPrivate = false;
    }
    return this.http.post<World>(this.worldsUrl, world, httpOptions);
  }
}
