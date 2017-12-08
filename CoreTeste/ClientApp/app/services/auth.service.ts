import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';

@Injectable()
export class Auth {
    profile: any;
    private roles: string[] = [];

    // Configure Auth0

    auth0 = new auth0.WebAuth({
        clientID: '24Zk6UElCxtVL7KV55GICchel7gHcngg',
        domain: 'allansuru.auth0.com',
        responseType: 'token id_token',
        audience: 'https://allansuru.auth0.com/userinfo',
        redirectUri: 'http://localhost:50349', 
        scope: 'openid'
    });

    constructor(public router: Router) { }

    public login(): void {
        this.auth0.authorize();
    }
    public handleAuthentication(): void {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                console.log('1')
                window.location.hash = '';
                this.setSession(authResult);
                this.router.navigate(['/home']);
            } else if (err) {
                this.router.navigate(['/home']);
                console.log(err);
            }
        });
    }

    private setSession(authResult): void {
        // Set the time that the access token will expire at
        const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
        console.log('setSession');
    }

    public logout(): void {
        // Remove tokens and expiry time from localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        // Go back to the home route
        this.router.navigate(['/']);
    }

    public isAuthenticated() {
        // Check whether the current time is past the
        // access token's expiry time
    
        const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');


        return new Date().getTime() < expiresAt;
    }

}