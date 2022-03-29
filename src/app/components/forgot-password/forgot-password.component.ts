import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  resetPasswordGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    this.resetPasswordGroup = fb.group({
      email: [ '', [ Validators.required, Validators.email ]]
    })
  }

  ngOnInit(): void {
  }

}
