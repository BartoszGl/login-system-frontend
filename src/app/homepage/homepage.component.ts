import { AuthService } from './../shared/service/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  isUserLoggedIn = false;
  username = "Anonim";
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // W przypadku gdy użytkownik nie jest zalogowany wyświetlam przyciki z loginem i rejestracją,
    // w przeciwnym wypadku wyświetlam user profile i nazwę użytkownika
    if (this.authService.userValue) {
      this.isUserLoggedIn = true;
      this.username = this.authService.userValue.email
    }
  }

}
