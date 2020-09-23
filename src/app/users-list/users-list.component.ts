import { RegistrationDetails } from './../registration/registration-details';
import { UserService } from './../services/user.service';
import {  Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { slideInAnimation } from '../app.animation';
declare var bootbox: any;

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
  animations: [slideInAnimation]
})
export class UsersListComponent implements OnInit{
  showForm = false;
  pageTitle = 'Users List';
  @ViewChild('filterbox') inputText: ElementRef;
  userToBeUptaded: RegistrationDetails = {} as RegistrationDetails;
  users: RegistrationDetails[] = [];
  // tslint:disable-next-line: variable-name
  _listFilter: string;
  filteredUsers: RegistrationDetails[];
  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredUsers = this._listFilter ? this.filterUsers(this._listFilter) : this.users;
  }
  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(
      result => {
        this.users = result;
        this.filteredUsers = this.users;
        console.log(this.filteredUsers);
      },
      error => alert(error)
    );
    // tslint:disable-next-line: no-string-literal
    // this.users = this.route.snapshot.data['resolvedUsers'];
    // this.filteredUsers = this.users;
  }

  filterUsers(filterBy: string): RegistrationDetails[] {
    return this.users.filter((user: RegistrationDetails) => user.username.toLocaleLowerCase().indexOf(filterBy.toLowerCase()) !== -1);
  }

  onEdit(user: RegistrationDetails): void {
    this.showForm = true;
    this.userToBeUptaded = user;
  }
  onCancel(message: string): void {
    if (message === 'Save') {
      alert('Saved successfully');
    }
    this.showForm = false;
  }
  onDelete(user: RegistrationDetails): void {
    if (user && user.id) {
      this.showForm = false;
      this.userService.deleteUser(user.id).subscribe(
        result => {
          console.log(result);
          this.ngOnInit();
        },
        error => console.log(error)
      );
    }
  }
}
