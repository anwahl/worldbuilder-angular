import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';
import { deleteOptions, getOptions, postOptions, putOptions } from '../../../_model/http-options';
import { World } from 'src/app/_model/world';
import { Region } from '../../model/region';

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  private regionUrl: string;
  private regionsByWorldUrl: string;

  constructor(private http: HttpClient) {
    this.regionUrl = environment.apiUrl + '/region';
    this.regionsByWorldUrl = environment.apiUrl + '/region/world/';
  }

  public findAll(): Observable<Region[]> {
    return this.http.get<Region[]>(this.regionUrl, getOptions);
  }

  public findById(id: String): Observable<Region> {
    return this.http.get<Region>(this.regionUrl + "/" + id, getOptions);
  }

  public findByWorld(world: World): Observable<Region[]> {
    return this.http.get<Region[]>(this.regionsByWorldUrl + world.id, getOptions);
  }

  public create(region: Region) {
    return this.http.post<Region>(this.regionUrl, region, postOptions);
  }

  public update(region: Region) {
    return this.http.put<Region>(this.regionUrl + "/" + region.id, region, putOptions);
  }

  public delete(region: Region) {
    return this.http.delete(this.regionUrl + "/" + region.id, deleteOptions);
  }
}
