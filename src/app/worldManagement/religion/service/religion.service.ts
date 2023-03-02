import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';
import { deleteOptions, getOptions, postOptions, putOptions } from '../../../_model/http-options';
import { World } from 'src/app/_model/world';
import { Religion } from '../../model/religion';

@Injectable({
  providedIn: 'root'
})
export class ReligionService {

  private religionUrl: string;
  private religionsByWorldUrl: string;

  constructor(private http: HttpClient) {
    this.religionUrl = environment.apiUrl + '/religion';
    this.religionsByWorldUrl = environment.apiUrl + '/religion/world/';
  }

  public findAll(): Observable<Religion[]> {
    return this.http.get<Religion[]>(this.religionUrl, getOptions);
  }

  public findById(id: String): Observable<Religion> {
    return this.http.get<Religion>(this.religionUrl + "/" + id, getOptions);
  }

  public findByWorld(world: World): Observable<Religion[]> {
    return this.http.get<Religion[]>(this.religionsByWorldUrl + world.id, getOptions);
  }

  public create(religion: Religion) {
    return this.http.post<Religion>(this.religionUrl, religion, postOptions);
  }

  public update(religion: Religion) {
    return this.http.put<Religion>(this.religionUrl + "/" + religion.id, religion, putOptions);
  }

  public delete(religion: Religion) {
    return this.http.delete(this.religionUrl + "/" + religion.id, deleteOptions);
  }
}
