import { Vehicle, KeyValuePair } from './../../models/vehicle';
import { VehicleService } from './../../services/vehicle.service';
import { Component, OnInit } from '@angular/core';
import { Auth } from "../../services/auth.service";


@Component({
    templateUrl: 'vehicle-list.html'
})

export class VehicleListComponent implements OnInit {
    private readonly PAGE_SIZE = 3;


    makes: KeyValuePair[];
    queryResult: any = {};
    query: any = {
        pageSize: this.PAGE_SIZE
    };
    columns = [
        { title: 'Id' },
        { title: 'Model', key: 'model', isSortable: true },
        { title: 'Make', key: 'make', isSortable: true },
        { title: 'Contact Name', key: 'contactName', isSortable: true },
       
        {}  
    ];

    constructor(private vehicleService: VehicleService, private auth: Auth)
    {
     
    }

    ngOnInit() {
        this.vehicleService.getMakes()
            .subscribe(m => this.makes = m);


        this.populateVehicles();

    }

    private populateVehicles() {

        this.vehicleService.getVehicles(this.query)
            .subscribe(result => this.queryResult = result);

    }

    onFilterChange() {

        this.query.page = 1;
        this.populateVehicles();


    }

    resetFilter() {
        this.query = {
            page: 1,
            pageSize: this.PAGE_SIZE
            
        };
        this.populateVehicles();
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
    onPageChange(page) {
        this.query.page = page;
        this.populateVehicles();
    }
}