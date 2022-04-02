import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../../utils/custom-validators";
import {AuthService} from "../../services/auth/auth.service";
import {DataService} from "../../services/data/data.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  dataGroup: any;
  certificates: any;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private dataService: DataService) {
    this.initializeFormGroup();
    this.initializeCertificates();
  }

  private initializeFormGroup() {
    this.dataGroup = this.fb.group({
      email: [this. authService.getAuthenticatedUserName() ],
      parentName: ['', [ CustomValidators.parentName()] ],
      phone: ['', [ CustomValidators.phone(true)] ],
      childName: ['', [ CustomValidators.childName()] ],
      dateOfBirth: ['', [ CustomValidators.dateOfBirth()] ],
      pinCode: ['', [ CustomValidators.pinCode(true)] ],
      certificate: [''],
      comment: [''],
    });
  }

  private initializeCertificates() {
    this.certificates = [
      { name: 'Income Certificate', checked: false },
      { name: 'Birth Certificate', checked: false },
      { name: 'Community Certificate', checked: false },
      { name: 'Current Address Proof', checked: false }
    ];
  }

  getErrorMessage(key: string): string {
    return this.dataGroup.get(key)!.errors![key].msg;
  }

  onSubmit() {
    this.updateFormGroupCertificates();
    if (this.dataGroup.valid) {
      this.dataService.submitData(this.dataGroup.value, () => {
        this.initializeFormGroup();
        this.initializeCertificates();
      });
    }
  }

  private updateFormGroupCertificates() {
    const certs = this.certificates
      .filter((cert: any) => cert.checked)
      .reduce((prev:any, curr: any) => prev == '' ? curr.name : `${prev}, ${curr.name}`, '');
    this.dataGroup.get('certificate').setValue(certs);
  }
}
