import { User } from './../shared/models/user';
import { AuthService } from './../shared/service/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  username: string;
  isAdmin: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.username = this.authService.userValue.email;
    this.isAdmin = this.authService.userValue.roles.includes("ROLE_ADMIN")
  }

  logout() {
    this.authService.logout();
  }

}
