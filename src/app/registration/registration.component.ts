import { UserService } from './../services/user.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RegistrationDetails } from './registration-details';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { slideInAnimation } from '../app.animation';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  animations: [slideInAnimation]
})
export class RegistrationComponent implements OnInit {

  // @Input() editRegistrationDetails: RegistrationDetails{};
  roles = ['Admin', 'User'];
  cardTitle: string;
  btnText: string;
  @Input() registrationDetails: RegistrationDetails = {} as RegistrationDetails;
  @Output() closeCard: EventEmitter<string> = new EventEmitter<string>();
  width: number;
  marginLeft: number;
  editMode = false;
  registrationError = false;
  registrationErrorMessage: string;
  loading = false;
  originalDetails: RegistrationDetails;
  isDirty: boolean = this.checkIsDirty();
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.originalDetails = { ...this.registrationDetails };
    if (this.registrationDetails && this.registrationDetails.id != null && this.registrationDetails.id > 0) {
      this.editMode = true;
    }
    if (this.editMode) {
      this.cardTitle = 'Edit User';
      this.btnText = 'Save';
      this.width = 100;
      this.marginLeft = 0;
    }
    else {
      this.cardTitle = 'Register';
      this.btnText = 'Register';
      this.width = 50;
      this.marginLeft = 25;
    }
  }
  onRegistrationError(errorResponse): void {
    console.log(errorResponse.status);
    this.registrationErrorMessage = 'Sorry.... Something went wrong!!!!';
    this.registrationError = true;
    this.loading = false;
  }
  onSubmit(form: NgForm): void {
    if (form.valid) {
      console.log(this.isDirty);
      this.loading = true;
      this.userService.addUser(this.registrationDetails).subscribe(
        result => {
          if (this.editMode === true) {
            this.closeCard.emit('Save');
          }
          else {
            this.router.navigate(['/login']);
          }
        },
        error => this.onRegistrationError(error)
      );
    }
  }

  onCancel(): void {
    this.closeCard.emit('Cancel');
  }

  checkIsDirty(): boolean {
    if (JSON.stringify(this.registrationDetails) !== JSON.stringify(this.originalDetails)) {
      return true;
    }
    return false;
  }
}
