import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent {
  feedbackGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    this.feedbackGroup = fb.group({
      feedback: ['', [Validators.required]]
    });
  }
}
