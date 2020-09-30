import { UserService } from './../services/user.service';
import { User } from './../login/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser: User;
  constructor(private userService: UserService) {
    this.userService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
  }

}
