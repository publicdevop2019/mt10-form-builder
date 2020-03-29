import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot } from '@angular/router';
import { forkJoin, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { CONST } from '../constant/constant';
import { HttpProxyService } from './http-proxy.service';
import { IForm } from 'magic-form/lib/classes/template.interface';
@Injectable()
export class InitSvc implements CanActivateChild, CanActivate {
  public _baseForm: IForm;
  private _dynamicForm: IForm;
  get baseForm(): IForm {
    return JSON.parse(JSON.stringify(this._baseForm));
  }
  set baseForm(inpuyt: IForm) {
    this._baseForm = JSON.parse(JSON.stringify(inpuyt));
  }
  get dynamicForm(): IForm {
    return JSON.parse(JSON.stringify(this._dynamicForm));
  }
  set dynamicForm(inpuyt: IForm) {
    this._dynamicForm = JSON.parse(JSON.stringify(inpuyt));
  }
  public dollarTemplates: IForm;
  constructor(
    private _httpClient: HttpClient,
    private _httpProxy: HttpProxyService
  ) {

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if (this._httpProxy.netImpl.currentUserAuthInfo) {
      return of(true);
    } else {
      if (route.queryParams['error'] !== undefined && route.queryParams['error'] !== null) {
        throw Error('user rejected auth request')
      }
      else if ((route.queryParams['code'] === undefined || route.queryParams['code'] === null) && environment.mode !== 'offline') {
        location.replace(`${environment.authorzieUrl}client_id=${CONST.APP_ID}&redirect_uri=${environment.oauthRedirectUri}&state=login`);
      } else {
        return this._httpProxy.netImpl.getToken(route.queryParams['code']);
      }
    }
  }
  canActivateChild(childRoute: ActivatedRouteSnapshot): Observable<boolean> {
    return new Observable<boolean>(ob => {
      if (childRoute.url[0].toString() === 'form-gui') {
        forkJoin([
          this._httpClient.get<IForm>(CONST.WORKSHOP_TOOLSETS_URL),
          this._httpClient.get<IForm>(CONST.WORKSHOP_TOOLSETS2_URL)
        ]).subscribe(next => {
          this.baseForm = next[0];
          this.dynamicForm = next[1];
          ob.next(true);
        });
      } else {
        ob.next(true);
      }
    });
  }
}