import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    this.signupGroup = fb.group({
      email: [ '', [ Validators.required, Validators.email] ],
      mobile: [ '', [ Validators.required, Validators.pattern("\d{10}")]],
      pin: [ '', [ Validators.required, Validators.pattern("\d{6}")]],
      password: [ '', [ Validators.required, Validators.min(8) ]],
      verifyPassword: [ '', [ Validators.required ]]
    })
  }

  ngOnInit(): void {
  }

}
