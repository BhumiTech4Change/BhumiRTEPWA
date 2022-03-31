import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { environment } from "../../../environments/environment";
import { SNACKBAR_CONFIG } from "../../models/constants";
import { MatSnackBar } from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient,
              private snackBar: MatSnackBar,
              private router: Router,
              private authService: AuthService) { }


  submitData(data: {}, successCallback: Function) {
    this.httpClient.post(`${environment.backendUrl}/form`, data).subscribe(
      (response: any) => {
        this.snackBar.open(response.msg, "Dismiss", SNACKBAR_CONFIG);
        if (response.success) {
          successCallback();
        }
      },
      (error: any) => {
        this.snackBar.open(error.msg, "Dismiss", SNACKBAR_CONFIG);
      });
  }

  submitFeedback(feedback: string) {
    this.httpClient.get(`${environment.backendUrl}/getFeedback/${this.authService.getAuthenticatedUserName()}/${feedback}`).subscribe(
      (response: any) => {
        this.snackBar.open(response.msg, "Dismiss", SNACKBAR_CONFIG);
        if (response.success) {
          this.router.navigate(['/']);
        }
      },
      (error: any) => {
        this.snackBar.open(error.msg, "Dismiss", SNACKBAR_CONFIG);
      });
  }
}
