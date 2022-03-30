import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {ErrorMessages} from "../../models/error-messages";
import { CustomValidators } from "../../utils/custom-validators";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupGroup: FormGroup;

  get mobileErrorMessage(): string {
    const errors = this.signupGroup.get('mobile')?.errors;
    if (!errors) return '';
    if (errors.hasOwnProperty('pattern')) {
      return ErrorMessages.INVALID_PHONE;
    } else if (errors.hasOwnProperty('required')) {
      return ErrorMessages.REQUIRED;
    }
    return '';
  }

  get pinErrorMessage(): string {
    const errors = this.signupGroup.get('pin')?.errors;
    if (!errors) return '';
    if (errors.hasOwnProperty('pattern')) {
      return ErrorMessages.INVALID_PIN;
    } else if (errors.hasOwnProperty('required')) {
      return ErrorMessages.REQUIRED;
    }
    return '';
  }

  get passwordErrorMessage(): string {
    const errors = this.signupGroup.get('password')?.errors;
    if (!errors) return '';
    if (errors.hasOwnProperty('minLength')) {
      return ErrorMessages.INVALID_PASSWORD;
    } else if (errors.hasOwnProperty('required')) {
      return ErrorMessages.REQUIRED;
    }
    return '';
  }

  get verifyPasswordErrorMessage(): string {
    const errors = this.signupGroup.get('verifyPassword')?.errors;
    if (!errors) return '';
    if (errors.hasOwnProperty('pattern')) {
      return ErrorMessages.INVALID_PHONE;
    } else if (errors.hasOwnProperty('required')) {
      return ErrorMessages.REQUIRED;
    }
    return '';
  }

  constructor(private fb: FormBuilder,
              private snackBar: MatSnackBar,
              private router: Router) {

    this.signupGroup = fb.group({
      email: [ '', [ CustomValidators.email(true )] ],
      mobile: [ '', [ CustomValidators.phone(true)] ],
      pin: [ '', [ CustomValidators.pin(true)] ],
      password: [ '', [ CustomValidators.password()] ],
      verifyPassword: [ '', []]
    });
    this.signupGroup.addValidators(CustomValidators.signupGroupValidator());
  }

  ngOnInit(): void {
  }

  createAccount() {
    if (this.signupGroup.valid) {
      this.snackBar.open("Account created, please login", "Dismiss", { duration: 3000 });
      this.router.navigate(['/login']);
    }
  }

  getErrorMessage(key: string): string {
    return this.signupGroup.get(key)!.errors![key].msg;
  }
}
