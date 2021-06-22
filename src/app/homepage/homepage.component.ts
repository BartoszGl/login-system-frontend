import { AuthService } from './../shared/service/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  isUserLoggedIn = false;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    if (this.authService.userValue) {
      this.isUserLoggedIn = true;
    }
  }

}
