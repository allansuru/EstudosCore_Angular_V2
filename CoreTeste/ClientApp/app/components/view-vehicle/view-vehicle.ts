﻿import { ToastyService } from 'ng2-toasty';
import { VehicleService } from './../../services/vehicle.service';
import { PhotoService } from './../../services/photo.service';
import { ProgressService } from './../../services/progress.service';
import { Component, OnInit, ElementRef, ViewChild, NgZone  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    templateUrl: 'view-vehicle.html'
})

export class ViewVehicleComponent implements OnInit {
    @ViewChild('fileInput') fileInput: ElementRef;
    vehicle: any;
    vehicleId: number;
    photos: any[];
    progress: any;

    constructor(
        private zone: NgZone, 
        private route: ActivatedRoute,
        private router: Router,
        private toasty: ToastyService,
        private photoService: PhotoService,
        private vehicleService: VehicleService,
        private progressService: ProgressService ) {

        route.params.subscribe(p => {
            this.vehicleId = +p['id'];
            if (isNaN(this.vehicleId) || this.vehicleId <= 0) {
                router.navigate(['/vehicles']);
                return;
            }
        });
    }

    ngOnInit() {
        this.photoService.getPhotos(this.vehicleId)
            .subscribe(photos => this.photos = photos);


        this.vehicleService.getVehicle(this.vehicleId)
            .subscribe(
            v => this.vehicle = v,
            err => {
                if (err.status == 404) {
                    this.router.navigate(['/vehicles']);
                    return;
                }
            });
    }

    delete() {
        if (confirm("Are you sure?")) {
            this.vehicleService.delete(this.vehicle.id)
                .subscribe(x => {
                    this.router.navigate(['/vehicles']);
                });
        }
    }
    uploadPhoto() {


        this.progressService.startTracking()
            .subscribe(progress => {
                this.zone.run(() => {
                    this.progress = progress;
                    console.log(progress);
                });
                null
            },
        
                () => { this.progress = null; });



        var nativeElement: HTMLInputElement = this.fileInput.nativeElement;
        var file: any;
        if (nativeElement.files)
             file = nativeElement.files[0];
        nativeElement.value = ''; // limpa o input file

      

        this.photoService.upload(this.vehicleId, file)
            .subscribe(photo => {
                this.photos.push(photo);
            },  
            err => {
                this.toasty.error({
                    title: 'Erro Upload Photo',
                    msg: err.text(),
                    theme: 'bootstrap',
                    showClose: true,
                    timeout: 5000

                });
            });
    }
}