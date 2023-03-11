import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';
import { deleteOptions, getOptions, postOptions, putOptions } from '../../../_model/http-options';
import { World } from 'src/app/_model/world';
import { Language } from '../../model/language';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private languageUrl: string;
  private languagesByWorldUrl: string;

  constructor(private http: HttpClient) {
    this.languageUrl = environment.apiUrl + '/language';
    this.languagesByWorldUrl = environment.apiUrl + '/language/world/';
  }

  public findAll(): Observable<Language[]> {
    return this.http.get<Language[]>(this.languageUrl, getOptions);
  }

  public findById(id: String): Observable<Language> {
    return this.http.get<Language>(this.languageUrl + "/" + id, getOptions);
  }

  public findByWorld(world: World): Observable<Language[]> {
    return this.http.get<Language[]>(this.languagesByWorldUrl + world.id, getOptions);
  }

  public create(language: Language) {
    return this.http.post<Language>(this.languageUrl, language, postOptions);
  }

  public update(language: Language) {
    return this.http.put<Language>(this.languageUrl + "/" + language.id, language, putOptions);
  }

  public delete(language: Language) {
    return this.http.delete(this.languageUrl + "/" + language.id, deleteOptions);
  }
}
