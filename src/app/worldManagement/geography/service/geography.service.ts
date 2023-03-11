import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';
import { deleteOptions, getOptions, postOptions, putOptions } from '../../../_model/http-options';
import { World } from 'src/app/_model/world';
import { Geography } from '../../model/geography';

@Injectable({
  providedIn: 'root'
})
export class GeographyService {

  private geographyUrl: string;
  private geographysByWorldUrl: string;

  constructor(private http: HttpClient) {
    this.geographyUrl = environment.apiUrl + '/geography';
    this.geographysByWorldUrl = environment.apiUrl + '/geography/world/';
  }

  public findAll(): Observable<Geography[]> {
    return this.http.get<Geography[]>(this.geographyUrl, getOptions);
  }

  public findById(id: String): Observable<Geography> {
    return this.http.get<Geography>(this.geographyUrl + "/" + id, getOptions);
  }

  public findByWorld(world: World): Observable<Geography[]> {
    return this.http.get<Geography[]>(this.geographysByWorldUrl + world.id, getOptions);
  }

  public findByWorldExcluding(world: World, geography: Geography): Observable<Geography[]> {
    return this.http.get<Geography[]>(this.geographysByWorldUrl + "exclude/" + world.id + "/" + geography.id, getOptions);
  }

  public create(geography: Geography) {
    return this.http.post<Geography>(this.geographyUrl, geography, postOptions);
  }

  public update(geography: Geography) {
    return this.http.put<Geography>(this.geographyUrl + "/" + geography.id, geography, putOptions);
  }

  public delete(geography: Geography) {
    return this.http.delete(this.geographyUrl + "/" + geography.id, deleteOptions);
  }
}
