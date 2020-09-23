import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RegistrationComponent } from './registration.component';

@Injectable({
  providedIn: 'root'
})
export class SaveGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component: RegistrationComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (component.isDirty) {
      return confirm('Moving away and lose all your data');
    }
    return true;
  }
}
