import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../login/user';

@Injectable({
  providedIn: 'root'
})
export class UsersListResolverService implements Resolve<any>{

  constructor(private userService: UserService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any | Observable<any> | Promise<any> {
    console.log("In Resovler");
    return this.userService.getAllUsers();
  }
}
