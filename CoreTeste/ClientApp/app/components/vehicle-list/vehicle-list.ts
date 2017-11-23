import { Vehicle, KeyValuePair } from './../../models/vehicle';
import { VehicleService } from './../../services/vehicle.service';
import { Component, OnInit } from '@angular/core';


@Component({
    templateUrl: 'vehicle-list.html'
})

export class VehicleListComponent implements OnInit {
    vehicles: Vehicle[];
    makes: KeyValuePair[];
    query: any = {};
    columns = [
        { title: 'Id' },
        { title: 'Model', key: 'model', isSortable: true },
        { title: 'Make', key: 'make', isSortable: true },
        { title: 'Contact Name', key: 'contactName', isSortable: true },
       
        {}  
    ];

    constructor(private vehicleService: VehicleService)
    { }

    ngOnInit() {
        this.vehicleService.getMakes()
            .subscribe(m => this.makes = m);


        this.populateVehicles();

    }

    private populateVehicles() {

        this.vehicleService.getVehicles(this.query)
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
        this.query = {};
        this.onFilterChange();
    }
    sortBy(columnName)
    {
        
        if (this.query.sortBy === columnName) {
            this.query.isSortAscending = !this.query.isSortAscending;
        }
        else {
            this.query.sortBy = columnName;
            this.query.isSortAscending = true;
        }
        this.populateVehicles();

    }
}