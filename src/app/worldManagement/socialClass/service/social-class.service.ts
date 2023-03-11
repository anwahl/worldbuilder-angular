import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';
import { deleteOptions, getOptions, postOptions, putOptions } from '../../../_model/http-options';
import { World } from 'src/app/_model/world';
import { SocialClass } from '../../model/social-class';

@Injectable({
  providedIn: 'root'
})
export class SocialClassService {

  private socialClassUrl: string;
  private socialClasssByWorldUrl: string;

  constructor(private http: HttpClient) {
    this.socialClassUrl = environment.apiUrl + '/socialClass';
    this.socialClasssByWorldUrl = environment.apiUrl + '/socialClass/world/';
  }

  public findAll(): Observable<SocialClass[]> {
    return this.http.get<SocialClass[]>(this.socialClassUrl, getOptions);
  }

  public findById(id: String): Observable<SocialClass> {
    return this.http.get<SocialClass>(this.socialClassUrl + "/" + id, getOptions);
  }

  public findByWorld(world: World): Observable<SocialClass[]> {
    return this.http.get<SocialClass[]>(this.socialClasssByWorldUrl + world.id, getOptions);
  }

  public create(socialClass: SocialClass) {
    return this.http.post<SocialClass>(this.socialClassUrl, socialClass, postOptions);
  }

  public update(socialClass: SocialClass) {
    return this.http.put<SocialClass>(this.socialClassUrl + "/" + socialClass.id, socialClass, putOptions);
  }

  public delete(socialClass: SocialClass) {
    return this.http.delete(this.socialClassUrl + "/" + socialClass.id, deleteOptions);
  }
}
