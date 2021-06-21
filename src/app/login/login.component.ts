import { AuthService } from './../shared/service/auth.service';
import { SnackbarService } from './../shared/service/snackbar.service';
import { UserAccountService } from './../shared/service/user-account.service';
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

  onSubmit() {
    let returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/profile'

    if (this.profileForm.invalid) {
      this.snBarService.display('Login form is invalid')
      return;
    }

    this.authService.login(this.profileForm.value).subscribe(res => {
      this.router.navigateByUrl(returnUrl);
    }, (err: HttpErrorResponse) => {
      let error: string[] = err.error
      this.snBarService.display(error.join('\n'));
    })
  }

}
