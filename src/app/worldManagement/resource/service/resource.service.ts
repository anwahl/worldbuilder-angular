import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';
import { deleteOptions, getOptions, postOptions, putOptions } from '../../../_model/http-options';
import { World } from 'src/app/_model/world';
import { Resource } from '../../model/resource';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  private resourceUrl: string;
  private resourcesByWorldUrl: string;

  constructor(private http: HttpClient) {
    this.resourceUrl = environment.apiUrl + '/resource';
    this.resourcesByWorldUrl = environment.apiUrl + '/resource/world/';
  }

  public findAll(): Observable<Resource[]> {
    return this.http.get<Resource[]>(this.resourceUrl, getOptions);
  }

  public findById(id: String): Observable<Resource> {
    return this.http.get<Resource>(this.resourceUrl + "/" + id, getOptions);
  }

  public findByWorld(world: World): Observable<Resource[]> {
    return this.http.get<Resource[]>(this.resourcesByWorldUrl + world.id, getOptions);
  }

  public create(resource: Resource) {
    return this.http.post<Resource>(this.resourceUrl, resource, postOptions);
  }

  public update(resource: Resource) {
    return this.http.put<Resource>(this.resourceUrl + "/" + resource.id, resource, putOptions);
  }

  public delete(resource: Resource) {
    return this.http.delete(this.resourceUrl + "/" + resource.id, deleteOptions);
  }
}
