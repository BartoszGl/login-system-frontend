import { UserAccountService } from './../shared/service/user-account.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { passwordValidator } from '../shared/directives/password-validator.directive'
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

  constructor(private userAccountService: UserAccountService) { }

  ngOnInit(): void {
  }

  get password() {
    return this.profileForm.get('password');
  }

  onSubmit() {
    //TODO: przygotować snack bar z ostrzeżeniem
    if (this.profileForm.invalid) {
      return;
    }
    this.userAccountService.registerUser(this.profileForm.value).subscribe(res => {
      console.log(res)
    })
  }

}
