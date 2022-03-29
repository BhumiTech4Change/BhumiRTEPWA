import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dataGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    this.dataGroup = fb.group({
      parentName: [ '', [ Validators.required ]],
      mobile: [ '', [ Validators.required, Validators.pattern("\d{10}")]],
      childName: [ '', [ Validators.required ]],
      childDob: [ '', [ Validators.required ]],
      pin: [ '', [ Validators.required, Validators.pattern("\d{6}")]],
      certificates: ['', []],
      comments: ['', []]
    })
  }

  ngOnInit(): void {
  }

}
