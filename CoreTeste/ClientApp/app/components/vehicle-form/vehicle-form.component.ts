import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { VehicleService } from './../../services/vehicle.service';
import { ToastyService } from "ng2-toasty";
import { Observable } from "rxjs/Observable";
import * as _ from 'underscore';
import 'rxjs/add/Observable/forkJoin';

import { SaveVehicle, Vehicle } from './../../models/vehicle';



@Component({
    selector: 'app-vehicle-form',
    templateUrl: './vehicle-form.component.html',
    styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
    // aqui monto meus arrays q eu vou trabalhar assim q carregados no ngInit()
    makes: any[];
    models: any[];
    features: any[];
    vehicle: SaveVehicle = {
        id: 0,
        makeId: 0,
        modelId: 0,
        isRegistered: false,
        features: [],
        contact: {
            name: '',
            phone: '',
            email: ''

        }
    };

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private vehicleService: VehicleService,
        private toastyService: ToastyService



    ) {
        route.params.subscribe(p => {
            this.vehicle.id = +p['id'] || 0;
        });
    }

    ngOnInit() {

        var sources = [
            this.vehicleService.getMakes(),
            this.vehicleService.getFeatures(),
        ];

        if (this.vehicle.id)
            sources.push(this.vehicleService.getVehicle(this.vehicle.id));

        //preencho aqui meus objetos oriundo do array sources, joguei dentro desse array!! boas praticas, poderia dentro do forkJoin([..,..,..])
        Observable.forkJoin(sources).subscribe(data => {
            this.makes = data[0];
            this.features = data[1];

            if (this.vehicle.id) {
                this.setVehicle(data[2]);
                this.populateModels();
            }

        }, err => {
            if (err.status == 404)
                this.router.navigate(['/home']);


        });

    }
    private setVehicle(v: Vehicle) {
        this.vehicle.id = v.id;
        this.vehicle.id = v.id;
        this.vehicle.makeId = v.make.id;
        this.vehicle.modelId = v.model.id;
        this.vehicle.isRegistered = v.isRegistered;
        this.vehicle.features = _.pluck(v.features, 'id');
        this.vehicle.contact = v.contact;

    }
    onMakeChange() {
        this.populateModels();

        delete this.vehicle.modelId;
    }



    private populateModels() {
        var selectedMake = this.makes.find(m => m.id == this.vehicle.makeId);
        this.models = selectedMake ? selectedMake.models : [];
    }

    onFeaturesToggle(featureId, $event) {
        if ($event.target.checked)
            this.vehicle.features.push(featureId);
        else {
            var index = this.vehicle.features.indexOf(featureId);
            this.vehicle.features.splice(index, 1);
        }
    }
    submit() {

        //update
        if (this.vehicle.id) {
            this.vehicleService.update(this.vehicle)
                .subscribe(x => this.toastyService.success({
                    title: 'Sucesso',
                    msg: 'Veículo Updated!',
                    theme: 'bootstrap',
                    showClose: true,
                    timeout: 5000
                }));
        }
        else {


            this.vehicleService.create(this.vehicle)
                .subscribe(x => this.toastyService.success({

                    title: 'Sucesso',
                    msg: 'Veículo Salvo com sucesso!',
                    theme: 'bootstrap',
                    showClose: true,
                    timeout: 5000
                }));
            //this.router.navigate(['/vehicles/', vehicle.id])
        }

    }
    delete() {
        if (this.vehicle.id) {
            if (confirm("Tem certeza?")) {
                this.vehicleService.delete(this.vehicle.id)
                    .subscribe(x => this.toastyService.success({

                        title: 'Sucesso',
                        msg: 'Veículo deletado com sucesso!',
                        theme: 'bootstrap',
                        showClose: true,
                        timeout: 5000
                    }));

                this.router.navigate(['/home']);
            }

        }
        else {
            this.toastyService.info({
                title: 'Aviso',
                msg: 'Busque um veículo para ser deletado!',
                theme: 'bootstrap',
                showClose: true,
                timeout: 5000
            });


        }
    }

}