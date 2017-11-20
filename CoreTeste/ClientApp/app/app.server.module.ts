import { NgModule, ErrorHandler } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppModuleShared } from './app.shared.module';
import { AppComponent } from './components/app/app.component';
import { AppErrorHandler } from './app.error-handler';
import { VehicleService } from './services/vehicle.service';
import { ToastyModule } from 'ng2-toasty';


@NgModule({
    bootstrap: [ AppComponent ],
    imports: [
        ServerModule,
        ToastyModule.forRoot(),
        AppModuleShared
    ],
    providers: [
        { provide: ErrorHandler, useClass: AppErrorHandler },
        VehicleService,
        //   FeatureService
    ]
})
export class AppModule {
}
