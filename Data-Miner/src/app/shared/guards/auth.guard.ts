import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AppRoutingModule } from 'src/app/components/app/app-routing.module';

//@Injectable({
//providedIn: 'root',
//})
//export class AuthGuard implements CanActivate {
// constructor(private _data: DataService, private _router: Router) {}

/* canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this._data.logueado) {
      alert('No tienes acceso');
      this._router.navigate(['/login']);
    }
    //return this._data.logueado; */
//}
//}
