import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpResponse,
  HttpHeaders,
  HttpClientModule,
} from '@angular/common/http';
import { GLOBAL } from './global';
import { map } from 'rxjs/operators';
import { LoginModel } from 'src/app/shared/models/loginModel';
import { observable } from 'rxjs';
import { UserModel } from 'src/app/shared/models/userModel';
import { Router } from '@angular/router';

@Injectable()
export class UserService {
  public url: string;

  constructor(private http: HttpClient, private router: Router) {
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
    headers.append('Access-Control-Allow-Methods', '*');
    headers.append('Access-Control-Allow-Origin', '*');
    return this.http
      .post(
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

  logOut() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
  goBackRegister() {
    this.router.navigate(['register']);
  }
  goBackUpload() {
    this.router.navigate(['upload']);
  }
  users: UserModel[] = [];
}
