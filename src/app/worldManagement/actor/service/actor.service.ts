import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';
import { deleteOptions, getOptions, postOptions, putOptions } from '../../../_model/http-options';
import { World } from 'src/app/_model/world';
import { Actor } from '../../model/actor';

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  private actorUrl: string;
  private actorsByWorldUrl: string;

  constructor(private http: HttpClient) {
    this.actorUrl = environment.apiUrl + '/actor';
    this.actorsByWorldUrl = environment.apiUrl + '/actor/world/';
  }

  public findAll(): Observable<Actor[]> {
    return this.http.get<Actor[]>(this.actorUrl, getOptions);
  }

  public findById(id: String): Observable<Actor> {
    return this.http.get<Actor>(this.actorUrl + "/" + id, getOptions);
  }

  public findByWorld(world: World): Observable<Actor[]> {
    return this.http.get<Actor[]>(this.actorsByWorldUrl + world.id, getOptions);
  }

  public create(actor: Actor) {
    return this.http.post<Actor>(this.actorUrl, actor, postOptions);
  }

  public update(actor: Actor) {
    return this.http.put<Actor>(this.actorUrl + "/" + actor.id, actor, putOptions);
  }

  public delete(actor: Actor) {
    return this.http.delete(this.actorUrl + "/" + actor.id, deleteOptions);
  }
}
