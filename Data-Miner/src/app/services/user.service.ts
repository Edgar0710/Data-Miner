import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpResponse,
  HttpHeaders,
  HttpClientModule,
} from '@angular/common/http';
import { GLOBAL } from './global';
import { map } from 'rxjs/operators';
import { LoginModel } from 'src/app/models/loginModel';
import { observable } from 'rxjs';
import { User } from 'src/app/models/user';

@Injectable()
export class UserService {
  public url: string;
  constructor(private http: HttpClient) {
    this.url = GLOBAL.url;
  }

  login(loginModel: any) {
    interface MyObj {
      correo: string;
      password: string;
    }

    let json = JSON.stringify(loginModel);
    let obj: MyObj = JSON.parse(json);

    let password64 = btoa(obj.password);

    let headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'GET');
    headers.append('Access-Control-Allow-Origin', '*');
    return this.http
      .get(
        this.url +
          'Usuario/Login' +
          '?email=' +
          obj.correo +
          '&password=' +
          password64,
        {
          headers,
        }
      )
      .pipe(map((res) => res));
  }


  upload(fd: FormData) {

    let headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'GET');
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
          1,fd,
        {
          headers,
        },
      )
      .pipe(map((res) => res));
  }


  users: User[] = [];
}
