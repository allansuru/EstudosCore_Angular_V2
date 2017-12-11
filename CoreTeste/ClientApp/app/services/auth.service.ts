import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';
import Auth0Lock from 'auth0-lock';
import { JwtHelper } from 'angular2-jwt';

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

    lock = new Auth0Lock('24Zk6UElCxtVL7KV55GICchel7gHcngg', 'allansuru.auth0.com', {});



    

    constructor(public router: Router) {
        this.lock.on("authenticated", (authResult) => this.onUserAuthenticated(authResult));
    }
    private onUserAuthenticated(authResult) {
        localStorage.setItem('token', authResult.accessToken);

        this.lock.getUserInfo(authResult.accessToken, (error, profile) => {
            if (error) {
                console.log(error);
                throw error;
            }

            localStorage.setItem('profile', JSON.stringify(profile));


            this.readUserFromLocalStorage();
        });
    }
    private readUserFromLocalStorage() {
        this.profile = JSON.parse(localStorage.getItem('profile') || '{}');

        var token = localStorage.getItem('id_token');
   
        if (token) {
            var jwtHelper = new JwtHelper();
            var decodedToken = jwtHelper.decodeToken(token);
            console.log(decodedToken);
            this.roles = decodedToken['https://allan.com/roles'] || [];
            console.log(this.roles)
        }
    }
    public login(): void {
        this.auth0.authorize();
    }
    public handleAuthentication(): void {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
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
    }

    public logout(): void {
        // Remove tokens and expiry time from localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        this.roles = [];
        // Go back to the home route
        this.router.navigate(['/']);
    }

    public isAuthenticated() {
        // Check whether the current time is past the
        // access token's expiry time

        const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');


        return new Date().getTime() < expiresAt;
    }

    private readTokeRole() {
        this.readUserFromLocalStorage();
    }
    public isInRole(roleName) {
        return this.roles.indexOf(roleName) > -1;
    }

}