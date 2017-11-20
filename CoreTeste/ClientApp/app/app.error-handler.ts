import * as Raven from 'raven-js';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandler, Inject, NgZone, isDevMode } from '@angular/core';



//private ngZone: NgZone,
export class AppErrorHandler implements ErrorHandler {
    constructor(
        @Inject(ToastyService) private toastyService: ToastyService) {
    }

    handleError(error: any): void {

        //if(!isDevMode)
        //  Raven.captureException(error.originalError || error); //falta criar a conta no sentry.io, pra capturar os erros!!


       // this.ngZone.run(() => { //esse cara arruma o async
            this.toastyService.error({
                title: 'Erro',
                msg: error,
                theme: 'bootstrap',
                showClose: true,
                timeout: 10000
            });
            console.log('passou');
      //  });
    }
}