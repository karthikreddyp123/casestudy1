import { UserService } from './services/user.service';
import { Component } from '@angular/core';

import { Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { User } from './login/user';
import { slideInAnimation } from './app.animation';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation]
})
export class AppComponent {
  title = 'authentication-casestudy';
  currentUser: User;
  loading: boolean;
  constructor(
    private router: Router,
    private userService: UserService
  ) {
    router.events.subscribe((routerEvent: Event) => {
      this.checkRouterEvent(routerEvent);
    });
    this.userService.currentUser.subscribe(x => this.currentUser = x);
  }
  checkRouterEvent(routerEvent: Event): void {
    if (routerEvent instanceof NavigationStart) {
      this.loading = true;
    }

    if (routerEvent instanceof NavigationEnd ||
        routerEvent instanceof NavigationCancel ||
        routerEvent instanceof NavigationError) {
      this.loading = false;
    }
  }
  logout(): void {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
