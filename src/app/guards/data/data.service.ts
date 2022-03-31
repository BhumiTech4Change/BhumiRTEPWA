import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { environment } from "../../../environments/environment";
import {SNACKBAR_CONFIG} from "../../models/constants";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient,
              private snackBar: MatSnackBar) { }


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
}
