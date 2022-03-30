import { Component, Input } from '@angular/core';
import { Router } from "@angular/router";
import { Location } from '@angular/common';

import { AuthService } from "../../services/auth/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input() title: any;

  backAllowedPages = ['about', 'feedback', 'forgot-password', 'credits', 'signup'];

  get showBackButton(): boolean {
    const currentUrl = this.router.url;
    return this.backAllowedPages.some(page => currentUrl.indexOf(page) >= 0);
  }

  constructor(public authService: AuthService,
              public router: Router,
              public location: Location) {}

}
