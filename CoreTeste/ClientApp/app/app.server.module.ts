import { NgModule, ErrorHandler } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppModuleShared } from './app.shared.module';
import { AppComponent } from './components/app/app.component';
import { AppErrorHandler } from './app.error-handler';
import { VehicleService } from './services/vehicle.service';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list';
import { ToastyModule } from 'ng2-toasty';
import { BrowserModule } from "@angular/platform-browser";


@NgModule({
    bootstrap: [ AppComponent ],
    imports: [
        ServerModule,
        ToastyModule.forRoot(),
        AppModuleShared
    ],
    exports: [BrowserModule, ToastyModule],
    providers: [
        { provide: ErrorHandler, useClass: AppErrorHandler },
        VehicleService,
        //   FeatureService
    ]
})
export class AppModule {
}
