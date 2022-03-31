import { AbstractControl, ValidatorFn } from "@angular/forms";

import { ErrorMessages } from "../models/error-messages";
import { isValidEmail, isValidPassword, isValidPhoneNumber, isValidPinCode } from "./utils";

export class CustomValidators {

  private static validate(field: string,
                          control: AbstractControl,
                          required: boolean,
                          validator?: Function,
                          validationError?: string) {
    if (required && (control.value == null || control.value.length === 0)) {
      return {
        [field]: {
          msg: ErrorMessages.REQUIRED
        }
      };
    }
    if (validator && !validator(control.value)) {
      return {
        [field]: {
          msg: validationError
        }
      }
    }
    return {};
  }

  static email(required: boolean): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      console.log(this.validate('email', control, required, isValidEmail, ErrorMessages.INVALID_EMAIL));
      return this.validate('email', control, required, isValidEmail, ErrorMessages.INVALID_EMAIL);
    };
  }

  static phone(required: boolean): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      return this.validate('phone', control, required, isValidPhoneNumber, ErrorMessages.INVALID_PHONE);
    };
  }

  static pin(required: boolean): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      return this.validate('pin', control, required, isValidPinCode, ErrorMessages.INVALID_PIN);
    };
  }

  static password(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      return this.validate('password', control, true, isValidPassword, ErrorMessages.INVALID_PASSWORD);
    };
  }

  static feedback(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      return this.validate('feedback', control, true);
    };
  }

  static signupGroupValidator(): ValidatorFn {
    return (group: AbstractControl): { [key: string]: any } => {
      const verifyPasswordControl = group.get('verifyPassword')!;
      const passwordControl = group.get('password')!;
      let errors = verifyPasswordControl.errors;
      if (verifyPasswordControl.value == null || verifyPasswordControl.value.length === 0) {
        errors = {
          verifyPassword: {
            msg: ErrorMessages.REQUIRED
          }
        };
      } else if (verifyPasswordControl.value !== passwordControl?.value) {
        errors = {
          verifyPassword: {
            msg: ErrorMessages.INVALID_VERIFY_PASSWORD
          }
        };
      } else {
        delete errors?.["verifyPassword"];
        errors = errors && Object.keys(errors).length > 0 ? errors : null;
      }
      verifyPasswordControl.setErrors(errors);
      return {};
    };
  }
}
