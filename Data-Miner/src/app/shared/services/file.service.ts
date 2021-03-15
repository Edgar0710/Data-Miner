import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpResponse,
  HttpHeaders,
  HttpClientModule,
} from '@angular/common/http';
import { GLOBAL } from './global';
import { map } from 'rxjs/operators';

@Injectable()
export class FileService {
  public url: string;

  constructor(private http: HttpClient) {
    this.url = GLOBAL.url;
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
          1,
        fd,
        {
          headers,
        }
      )
      .pipe(map((res) => res));
  }
}
