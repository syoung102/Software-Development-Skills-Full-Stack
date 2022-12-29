import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from 'app/services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private authService:AuthService, private router:Router) {

    }

    canActivate() {
        if(this.authService.loggedIn()) {
            // we're logged in
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}