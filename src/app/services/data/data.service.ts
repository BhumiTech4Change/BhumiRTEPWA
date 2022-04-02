import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { environment } from "../../../environments/environment";
import { SNACKBAR_CONFIG } from "../../models/constants";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { AuthService } from "../auth/auth.service";
import { LoaderService } from "../loader/loader.service";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient,
              private snackBar: MatSnackBar,
              private router: Router,
              private authService: AuthService,
              private loaderService: LoaderService) { }


  submitData(data: {}, successCallback: Function) {
    this.loaderService.loading$.next(true);
    this.httpClient.post(`${environment.backendUrl}/form`, data).subscribe(
      (response: any) => {
        this.snackBar.open(response.msg, "Dismiss", SNACKBAR_CONFIG);
        if (response.success) {
          successCallback();
        }
        this.loaderService.loading$.next(false);
      },
      (error: any) => {
        this.snackBar.open(error.msg, "Dismiss", SNACKBAR_CONFIG);
        this.loaderService.loading$.next(false);
      });
  }

  submitFeedback(feedback: string) {
    this.loaderService.loading$.next(true);
    this.httpClient.get(`${environment.backendUrl}/getFeedback/${this.authService.getAuthenticatedUserName()}/${feedback}`).subscribe(
      (response: any) => {
        this.snackBar.open(response.msg, "Dismiss", SNACKBAR_CONFIG);
        if (response.success) {
          this.router.navigate(['/']);
        }
        this.loaderService.loading$.next(false);
      },
      (error: any) => {
        this.snackBar.open(error.msg, "Dismiss", SNACKBAR_CONFIG);
        this.loaderService.loading$.next(false);
      });
  }
}
