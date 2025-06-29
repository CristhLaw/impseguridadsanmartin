import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GenericService } from './generic.service';
import { SolicitudRepuesto } from '../modelo/Solicitudrepuesto';
import { environment } from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitudrepuestoService extends GenericService<SolicitudRepuesto> {

  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/solicitudrepo`)

  }



}
