import { Component, OnInit } from '@angular/core';
import { Vehicle, KeyValuePair } from './../../models/vehicle';
import { VehicleService } from './../../services/vehicle.service';

@Component({

    template: `<h1>Admin - Exemplo</h1> 
            <chart type="pie" [data]="data"></chart>
              
            <h1>Makes</h1>
        <chart type="pie" [data]="data2"></chart>
        `
   
})

export class AdminComponent implements OnInit
{
    makes: any[];

    data2 = {};
   

    data = {
        labels: ['BMW', 'Audi', 'Mazda', 'Ferrari'],
        datasets: [
            {
                data: [5, 2, 1, 10],
                backgroundColor: [
                    "#ff6384",
                    "#35a2eb",
                    "#36a2eb",
                    "#ffce56"
                ]
            }
        ]
    };
    constructor(private vehicleService: VehicleService) { }

    ngOnInit()
    {
        this.vehicleService.getMakes()
            .subscribe(m => {
                this.makes = m

                console.log(m);

                this.data2 = {
                    labels: [m[0].name, m[1].name, m[2].name],
                    datasets: [
                        {
                            data: [m[0].id, m[1].id, m[2].id],
                            backgroundColor: [
                                "#ff6384",
                                "#35a2eb",
                                "#ffce56"
                            ]
                    }]
                }


            });

        
    }
}