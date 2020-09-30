import { Router } from '@angular/router';
import { UserService } from './../services/user.service';
import { LoginDetails } from './../login/login-details';
import { NgForm } from '@angular/forms';
import { ForgotPasswordService } from './../services/forgot-password.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordDetails: LoginDetails = {
    username: null,
    password: null
  };
  username: string;
  loading = false;
  changePasswordLoading = false;
  mailSent = false;
  passwordMatch = false;
  generatedPassword: string;
  newPassword: string;
  errorMessage: string;
  error = false;
  constructor(private forgotPasswordService: ForgotPasswordService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    console.log('In Forgot');
  }
  onSend(): void {
    if (this.username) {
      this.loading = true;
      this.forgotPasswordService.sendMail(this.username).subscribe(
        result => {
          console.log(this.forgotPasswordService.generatedPassword);
          this.loading = false;
          this.mailSent = true;
        },
        err => {
          console.log(err);
          this.loading = false;
        }
      );
    }
  }
  onChange(): void {
    if (this.forgotPasswordService.generatedPassword === this.generatedPassword) {
      this.passwordMatch = true;
      console.log('matched');
    }
    else {
      this.passwordMatch = false;
      console.log('Not matched');
    }
  }
  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.changePasswordLoading = true;
      this.forgotPasswordDetails = {
        username: this.username,
        password: this.newPassword
      };
      this.userService.changePassword(this.forgotPasswordDetails).subscribe(
        result => this.router.navigate(['/login']),
        error => this.onPasswordChangeError(error)
      );
    }
  }
  onPasswordChangeError(errorResponse): void {
    console.log(errorResponse.status);
    this.errorMessage = 'Sorry.... Something went wrong!!!!';
    this.error = true;
    this.changePasswordLoading = false;
  }
}
