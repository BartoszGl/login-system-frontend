import { AuthService } from './../shared/service/auth.service';
import { SnackbarService } from './../shared/service/snackbar.service';
import { UserAccountService } from './../shared/service/user-account.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { passwordValidator } from '../shared/directives/password-validator.directive'
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  profileForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [passwordValidator()]),
  });

  constructor(private authService: AuthService, private snBarService: SnackbarService) { }

  ngOnInit(): void {
  }

  get password() {
    return this.profileForm.get('password');
  }

  onSubmit() {

    if (this.profileForm.invalid) {
      return;
    }

    this.authService.login(this.profileForm.value).subscribe(res => {
      let test = localStorage.getItem('user_data');
      console.log(this.authService.userValue);
    }, (err: HttpErrorResponse) => {
      let error: string[] = err.error
      this.snBarService.display(error.join('\n'));
    })
  }

}
