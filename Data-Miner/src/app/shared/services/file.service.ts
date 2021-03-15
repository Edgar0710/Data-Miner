import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpResponse,
  HttpHeaders,
  HttpClientModule,
} from '@angular/common/http';
import { GLOBAL } from './global';
import { map } from 'rxjs/operators';
import { UserModel } from '../models/userModel';

@Injectable()
export class FileService {
  public url: string;
  public user: UserModel;
  public bearer:string;
  constructor(private http: HttpClient) {
    this.url = GLOBAL.url;
    this.user = JSON.parse(localStorage.getItem("usuario"));
    this.bearer=''+this.user.us_athorization;
  }

  upload(fd: FormData) {
    let headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', '*');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http
      .post(
        this.url +
        'Form/InsertaForm' +
        '?nombre=' +
        'test' +
        '&descripcion=' +
        'test' +
        '&usuario=' +
        this.user.us_id,
        fd,
        {
          headers,
        }
      )
      .pipe(map((res) => res));
  }

  getForms() {

    let headers = new HttpHeaders();

    headers.set('Access-Control-Allow-Headers', 'Content-Type');
    headers.set('Access-Control-Allow-Methods', '*');
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Authorization','bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjoiTVE9PSIsImV4cCI6MTYxNTc5NzYwMiwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzMDcvIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzMDcvIn0.VCZDmTuxxA2-dVYOXWdphTh20phdZj0CKw2h9i5aEYw')
    return this.http
      .get(
        this.url +
        'Form/GetForms?usuario=' + this.user.us_id,
       {headers:headers}
      )
      .pipe(map((res) => res));
  }
}

