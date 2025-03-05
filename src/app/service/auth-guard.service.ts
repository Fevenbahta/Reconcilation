import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
  console.log("this.authService.isitAuthenticated()", this.authService.tra,this.authService.isitAuthenticated())
    if (this.authService.isitAuthenticated() && this.authService.tra) {
      console.log("user authenticated") 
      return true; // Allow navigation to /user/:id if user is authenticated
    } else {
      this.router.navigate(['/login']);
      console.log("user notauthenticated") 
      return false; // Redirect to login page if user is not authenticated
    }
  }
}
