import { Inject, Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenericService<T> {

  constructor(protected http: HttpClient, @Inject('url') protected url: string) { }

  findAll() {
    return this.http.get<T[]>(`${this.url}`);
  }

  findById(id: number) {
    return this.http.get<T>(`${this.url}/${id}`);
  }

  save(t: T, headers: HttpHeaders = new HttpHeaders()): Observable<T> {
    return this.http.post<T>(this.url, t, { headers });
  }


  update(id: number, t: T) {
    return this.http.put<T>(`${this.url}/${id}`, t);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
