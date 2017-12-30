import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserXhr } from '@angular/http';
import { BrowserXhrWithProgress, ProgressService } from './services/progress.service';
import { AppModuleShared } from './app.shared.module';
import { AppComponent } from './components/app/app.component';
import { ToastyModule } from 'ng2-toasty';
import { FormsModule } from '@angular/forms';
import { AppErrorHandler } from './app.error-handler';
import { VehicleService } from './services/vehicle.service';
import { PhotoService } from "./services/photo.service";
import { Auth } from "./services/auth.service";
import { AuthGuard } from "./services/auth-guard.service";
import { AdminAuthGuard } from "./services/admin-auth-guard.service";
import { AUTH_PROVIDERS } from "angular2-jwt/angular2-jwt";



@NgModule({
    bootstrap: [ AppComponent ],
    imports: [
        BrowserModule,
        FormsModule,
        ToastyModule.forRoot(),
        AppModuleShared
    ],
    //SEM ESSE CARA, INJEÇÃO DE DEPENDENCIA NAO FUNFA!!
    providers: [
        { provide: ErrorHandler, useClass: AppErrorHandler },
    
        Auth,
        VehicleService,
        PhotoService,
        AuthGuard,
        AdminAuthGuard,
        AUTH_PROVIDERS
    ]
})
export class AppModule {
}

export function getBaseUrl() {
    return document.getElementsByTagName('base')[0].href;
}
