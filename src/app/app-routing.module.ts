import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./components/login/login.component";
import { SignupComponent } from "./components/signup/signup.component";
import { AboutComponent } from "./components/about/about.component";
import { ForgotPasswordComponent } from "./components/forgot-password/forgot-password.component";
import { HomeComponent } from "./components/home/home.component";
import { FeedbackComponent } from "./components/feedback/feedback.component";
import { CreditsComponent } from "./components/credits/credits.component";
import { AuthGuard } from "./guards/auth/auth.guard";

const routes: Routes = [
  { path: '', redirectTo: 'home',  pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'about', component: AboutComponent },
  { path: 'credits', component: CreditsComponent },

  { path: 'home', component: HomeComponent, canActivate: [ AuthGuard ] },
  { path: 'feedback', component: FeedbackComponent, canActivate: [ AuthGuard ] },

  { path: '**', redirectTo: 'home',  pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
