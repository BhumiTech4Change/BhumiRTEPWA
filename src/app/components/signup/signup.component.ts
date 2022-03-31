import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { CustomValidators } from "../../utils/custom-validators";
import { AuthService } from "../../services/auth/auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupGroup: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService) {

    this.signupGroup = fb.group({
      email: [ '', [ CustomValidators.email(true )] ],
      phone: [ '', [ CustomValidators.phone(true)] ],
      pin: [ '', [ CustomValidators.pin(true)] ],
      password: [ '', [ CustomValidators.password()] ],
      verifyPassword: [ '', []]
    });
    this.signupGroup.addValidators(CustomValidators.signupGroupValidator());
  }

  createAccount() {
    if (this.signupGroup.valid) {
      this.authService.createAccount(this.signupGroup.value);
    }
  }

  getErrorMessage(key: string): string {
    return this.signupGroup.get(key)!.errors![key].msg;
  }
}
