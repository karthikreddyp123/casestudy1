import { User } from './../login/user';
import { LoginDetails } from './../login/login-details';
import { BehaviorSubject, Observable, pipe } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegistrationDetails } from '../registration/registration-details';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  user: User;
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  addUser(registartionDetails: RegistrationDetails): Observable<any> {
    return this.http.post('http://localhost:4000/users', registartionDetails);
  }
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
  authenticate(loginDetails: LoginDetails): any {
    return this.http.post<any>('http://localhost:4000/login', loginDetails, { observe: 'response' }).
      pipe(map(response => {
        const token: string = response.headers.get('Authorization');
        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(token.replace('Bearer ', ''));
        this.user = {
          username: decodedToken.sub,
          token: token.replace('Bearer ', ''),
          role: decodedToken.role
        };
        this.currentUserSubject.next(this.user);
        const currentUser = JSON.stringify({
          username: decodedToken.sub,
          role: decodedToken.role,
          token: token.replace('Bearer ', '')
        });
        localStorage.setItem('currentUser', currentUser);
      }));
  }
  getAllUsers(): Observable<any> {
    return this.http.get('http://localhost:4000/users');
  }
  deleteUser(id: number): Observable<any> {
    return this.http.delete('http://localhost:4000/users/' + id);
  }
  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
