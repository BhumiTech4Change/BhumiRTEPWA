import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { CustomValidators } from "../../utils/custom-validators";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  resetPasswordGroup: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService) {
    this.resetPasswordGroup = fb.group({
      email: [ '', [ CustomValidators.email(true) ]]
    })
  }

  getErrorMessage(key: string): string {
    return this.resetPasswordGroup.get(key)!.errors![key].msg;
  }

  onSubmit() {
    if (this.resetPasswordGroup.valid) {
      const username = this.resetPasswordGroup.get('email')?.value;
      this.authService.forgotPassword(username);
    }

  }
}
