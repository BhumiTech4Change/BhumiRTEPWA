import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isUserAuthenticated() {
    return true;
  }

  logout() {}
}
