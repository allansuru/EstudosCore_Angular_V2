import { Vehicle, KeyValuePair } from './../../models/vehicle';
import { VehicleService } from './../../services/vehicle.service';
import { Component, OnInit } from '@angular/core';


@Component({
    templateUrl: 'vehicle-list.html'
})

export class VehicleListComponent implements OnInit {
    vehicles: Vehicle[];
    makes: KeyValuePair[];
    filter: any = {};



    constructor(private vehicleService: VehicleService)
    { }

    ngOnInit() {
        this.vehicleService.getMakes()
            .subscribe(m => this.makes = m);


        this.populateVehicles();

    }

    private populateVehicles() {

        this.vehicleService.getVehicles(this.filter)
            .subscribe(v => this.vehicles = v);

    }

    onFilterChange() {

        //pra testar mais de um filtro
        // this.filter.modelId = 4;

        this.populateVehicles();


        //let vehicles = this.AllVehicles;

        //if (this.filter.makeId)
        //    vehicles = vehicles.filter(v => v.make.id == this.filter.makeId)

        //if (this.filter.modelId)
        //    vehicles = vehicles.filter(v => v.model.id == this.filter.modelId)

        //this.vehicles = vehicles;
    }

    resetFilter() {
        this.filter = {};
        this.onFilterChange();
    }
}