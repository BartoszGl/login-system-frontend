import { AuthService } from './../shared/service/auth.service';
import { SnackbarService } from './../shared/service/snackbar.service';
import { UserAccountService } from '../shared/service/user-register.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { passwordValidator } from '../shared/directives/password-validator.directive'
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  returnUrl: string;

  profileForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [passwordValidator()]),
  });

  constructor(private authService: AuthService,
    private snBarService: SnackbarService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
  }

  get password() {
    return this.profileForm.get('password');
  }

  onSubmit(): void {
    // W sytuacji, gdy w query podany jest link, np do aktywacji emaila,
    // po loginie zakończonym sukcesem przekierowuję na wybrany link
    let returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/profile'

    // Pomimo, że to login i tak waliduję form, poprawnie zarejestrowani użytkownicy muszą wpisywać poprawne dane
    if (this.profileForm.invalid) {
      this.snBarService.display('Please verify that credentials are correct')
      return;
    }
    this.authService.login(this.profileForm.value).subscribe(res => {
      this.router.navigateByUrl(returnUrl);
    }, (err: HttpErrorResponse) => {
      // Błędy 401 i 403 są globalnie obsługiwane przez error interceptor
    })
  }

}
