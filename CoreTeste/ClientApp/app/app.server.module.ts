import { NgModule, ErrorHandler } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppModuleShared } from './app.shared.module';
import { AppComponent } from './components/app/app.component';
import { AppErrorHandler } from './app.error-handler';
import { BrowserModule } from "@angular/platform-browser";



@NgModule({
    bootstrap: [ AppComponent ],
    imports: [
        ServerModule,
        AppModuleShared
    ],
    exports: [BrowserModule],
    providers: [
        { provide: ErrorHandler, useClass: AppErrorHandler },
 

    ]
})
export class AppModule {
}
