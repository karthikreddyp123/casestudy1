import { UserService } from './../services/user.service';
import { LoginDetails } from './login-details';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginDetails: LoginDetails = {
    username: null,
    password: null
  };
  loginError = false;
  loginErrorMessage: string;
  loading = false;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onLoginError(errorResponse): void {
    console.log(errorResponse.status);
    if (errorResponse.status === 401) {
      this.loginErrorMessage = 'Invalid Credentials....Please try again!!!';
    }
    else {
      this.loginErrorMessage = 'Sorry.... Something went wrong!!!!';
    }
    this.loginError = true;
    this.loading = false;
  }
  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.loading = true;
      this.userService.authenticate(this.loginDetails).subscribe(
        result => this.router.navigate(['/']),
        error => this.onLoginError(error)
      );
    }
  }
}
