import { Component } from '@angular/core';
import  {FormBuilder, FormGroup, Validators } from "@angular/forms";
import {ErrorMessages} from "../../models/error-messages";
import { CustomValidators } from "../../utils/custom-validators";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hide: boolean = true;
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = fb.group({
      email: ['', [ CustomValidators.email(true) ] ],
      password: ['', [ CustomValidators.password() ]]
    })
  }

  getErrorMessage(key: string): string {
    return this.loginForm.get(key)!.errors![key].msg;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value);
    }
  }
}
