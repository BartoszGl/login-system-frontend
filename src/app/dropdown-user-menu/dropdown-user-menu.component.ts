import { Router } from '@angular/router';
import { AuthService } from './../shared/service/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dropdown-user-menu',
  templateUrl: './dropdown-user-menu.component.html',
  styleUrls: ['./dropdown-user-menu.component.css']
})
export class DropdownUserMenuComponent implements OnInit {

  username: string;
  openMenu = false;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.username = this.authService.userValue.email;
  }

  logout() {
    this.authService.logout({}, false);
    this.router.navigate(['/']);
  }
}
