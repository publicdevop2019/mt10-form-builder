import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { HttpProxyService } from './http-proxy.service';
/**
 * use refresh token if call failed
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private _errorStatus: number[] = [500, 503, 502];
  constructor(
    private router: Router,
    private _httpProxy: HttpProxyService,
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (this._httpProxy.netImpl.currentUserAuthInfo && this._httpProxy.netImpl.currentUserAuthInfo.access_token && !this._httpProxy.expireRefresh)
      req = req.clone({ setHeaders: { Authorization: `Bearer ${this._httpProxy.netImpl.currentUserAuthInfo.access_token}` } });
    return next.handle(req).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse) {
        let httpError = error as HttpErrorResponse;
        if (httpError.status === 401) {
          /**
           * @todo for 401 type error refer to auth2service-ui
           */
          this.logError('token expired');
        } else if (this._errorStatus.indexOf(httpError.status) > -1) {
          this.router.navigate(['/error'])
        } else if (httpError.status === 404) {
          this.logError('URL Not Found');
          return throwError(error);
        } else if (httpError.status === 403) {
          this.logError('Access is not allowed');
          return throwError(error);
        } else if (httpError.status === 400) {
          this.logError('Invalid request');
          return throwError(error);
        } else if (httpError.status === 0) {
          this.logError('Network connection failed');
          return throwError(error);
        } else {
          console.error(error)
          return throwError(error);
        }

      }
    })

    );
  }
  logError(msg: string): void {
    console.error('network error::' + msg);
  }
}