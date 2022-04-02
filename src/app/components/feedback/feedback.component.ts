import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";

import { CustomValidators } from "../../utils/custom-validators";
import { DataService } from "../../services/data/data.service";

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent {
  feedbackGroup: FormGroup;

  constructor(private fb: FormBuilder,
              private dataService: DataService) {
    this.feedbackGroup = fb.group({
      feedback: ['', [ CustomValidators.feedback() ]]
    });
  }

  getErrorMessage(key: string): string {
    return this.feedbackGroup.get(key)!.errors![key].msg;
  }

  onSubmit() {
    if (this.feedbackGroup.valid) {
      this.dataService.submitFeedback(this.feedbackGroup.get('feedback')?.value);
    }
  }
}
