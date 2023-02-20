import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';
import { deleteOptions, getOptions, postOptions, putOptions } from '../../../_model/http-options';
import { World } from 'src/app/_model/world';
import { Race } from '../../model/race';

@Injectable({
  providedIn: 'root'
})
export class RaceService {

  private raceUrl: string;
  private racesByWorldUrl: string;

  constructor(private http: HttpClient) {
    this.raceUrl = environment.apiUrl + '/race';
    this.racesByWorldUrl = environment.apiUrl + '/race/world/';
  }

  public findAll(): Observable<Race[]> {
    return this.http.get<Race[]>(this.raceUrl, getOptions);
  }

  public findById(id: String): Observable<Race> {
    return this.http.get<Race>(this.raceUrl + "/" + id, getOptions);
  }

  public findByWorld(world: World): Observable<Race[]> {
    return this.http.get<Race[]>(this.racesByWorldUrl + world.id, getOptions);
  }

  public create(race: Race) {
    return this.http.post<Race>(this.raceUrl, race, postOptions);
  }

  public update(race: Race) {
    return this.http.put<Race>(this.raceUrl + "/" + race.id, race, putOptions);
  }

  public delete(race: Race) {
    return this.http.delete(this.raceUrl + "/" + race.id, deleteOptions);
  }
}
