import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}
@Injectable()
export class DeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
  constructor(
  ) {
  }
  canDeactivate(component: CanComponentDeactivate, currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot) {
    if (this._navSystemError(nextState.url)) {
      return true;
    } else {
      return component.canDeactivate ? component.canDeactivate() : true;
    }
  }
  private _navSystemError(nextUrl: string) {
    if (nextUrl === '/sysError') {
      return true;
    } else {
      return false;
    }
  }
}
