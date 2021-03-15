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
  public user:UserModel;
  constructor(private http: HttpClient) {
    this.url = GLOBAL.url;
    this.user=JSON.parse(localStorage.getItem("usuario"));

  }

  upload(fd: FormData) {
    let headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', '*');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Authorization',`Bearer ${this.user.us_athorization}`)
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
}
