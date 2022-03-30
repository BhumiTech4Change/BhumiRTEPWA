import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { CustomValidators } from "../../utils/custom-validators";

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent {
  feedbackGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    this.feedbackGroup = fb.group({
      feedback: ['', [ CustomValidators.feedback() ]]
    });
  }

  getErrorMessage(key: string): string {
    return this.feedbackGroup.get(key)!.errors![key].msg;
  }
}
