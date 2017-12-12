import { CanActivate } from '@angular/router';
import { Auth } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(protected auth: Auth) { }

    canActivate() {
        if (this.auth.isAuthenticated())
            return true;

        this.auth.login();
                                    
        return false;
    }
}