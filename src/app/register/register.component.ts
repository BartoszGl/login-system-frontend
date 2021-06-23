import { RegisterResult } from './../shared/models/register-result';
import { SnackbarService } from './../shared/service/snackbar.service';
import { UserRegisterService } from '../shared/service/user-register.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { passwordValidator } from '../shared/directives/password-validator.directive'
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  profileForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [passwordValidator()]),
  });

  constructor(private userRegisterService: UserRegisterService, private snBarService: SnackbarService) { }

  ngOnInit(): void {
  }

  get password(): AbstractControl {
    return this.profileForm.get('password');
  }

  onSubmit(): void {
    // Walidacja formularza rejestracyjnego
    if (this.profileForm.invalid) {
      this.snBarService.display('Please verify that credentials are correct')
      return;
    }

    this.userRegisterService.registerUser(this.profileForm.value).subscribe((res: RegisterResult) => {
      this.snBarService.display(res.result);
    }, (err: HttpErrorResponse) => {
      // Błędy 401 i 403 są globalnie obsługiwane przez error interceptor
    })
  }

}
