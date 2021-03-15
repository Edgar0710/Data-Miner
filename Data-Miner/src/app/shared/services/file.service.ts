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
  public bearer: string;
  constructor(private http: HttpClient) {
    this.url = GLOBAL.url;
    this.user = JSON.parse(localStorage.getItem('usuario'));
    this.bearer = '' + this.user.us_athorization;
  }

  upload(fd: FormData, fileUploadModel: any) {
    interface MyObj {
      nombre: string;
      descripcion: string;
    }

    let json = JSON.stringify(fileUploadModel);
    let obj: MyObj = JSON.parse(json);

    const headers = new HttpHeaders({
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Origin': '*',
      Authorization: 'Bearer ' + this.user.us_athorization,
    });

    return this.http
      .post(
        this.url +
          'Form/InsertaForm' +
          '?nombre=' +
          obj.nombre +
          '&descripcion=' +
          obj.descripcion +
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
    const headers = new HttpHeaders({
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Origin': '*',
      Authorization: 'Bearer ' + this.user.us_athorization,
    });
    return this.http
      .get(this.url + 'Form/GetForms?usuario=' + this.user.us_id, {
        headers: headers,
      })
      .pipe(map((res) => res));
  }
}
