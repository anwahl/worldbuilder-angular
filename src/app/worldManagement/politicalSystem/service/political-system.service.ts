import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';
import { deleteOptions, getOptions, postOptions, putOptions } from '../../../_model/http-options';
import { World } from 'src/app/_model/world';
import { PoliticalSystem } from '../../model/political-system';

@Injectable({
  providedIn: 'root'
})
export class PoliticalSystemService {

  private politicalSystemUrl: string;
  private politicalSystemsByWorldUrl: string;

  constructor(private http: HttpClient) {
    this.politicalSystemUrl = environment.apiUrl + '/politicalSystem';
    this.politicalSystemsByWorldUrl = environment.apiUrl + '/politicalSystem/world/';
  }

  public findAll(): Observable<PoliticalSystem[]> {
    return this.http.get<PoliticalSystem[]>(this.politicalSystemUrl, getOptions);
  }

  public findById(id: String): Observable<PoliticalSystem> {
    return this.http.get<PoliticalSystem>(this.politicalSystemUrl + "/" + id, getOptions);
  }

  public findByWorld(world: World): Observable<PoliticalSystem[]> {
    return this.http.get<PoliticalSystem[]>(this.politicalSystemsByWorldUrl + world.id, getOptions);
  }

  public create(politicalSystem: PoliticalSystem) {
    return this.http.post<PoliticalSystem>(this.politicalSystemUrl, politicalSystem, postOptions);
  }

  public update(politicalSystem: PoliticalSystem) {
    return this.http.put<PoliticalSystem>(this.politicalSystemUrl + "/" + politicalSystem.id, politicalSystem, putOptions);
  }

  public delete(politicalSystem: PoliticalSystem) {
    return this.http.delete(this.politicalSystemUrl + "/" + politicalSystem.id, deleteOptions);
  }
}
