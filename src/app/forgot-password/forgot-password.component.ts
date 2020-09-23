import { ForgotPasswordService } from './../services/forgot-password.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  username: string;
  loading = false;
  mailSent = false;
  passwordMatch = false;
  generatedPassword: string;
  newPassword: string;
  constructor(private forgotPasswordService: ForgotPasswordService) { }

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
    else{
      console.log('Not matched');
    }
  }
}
