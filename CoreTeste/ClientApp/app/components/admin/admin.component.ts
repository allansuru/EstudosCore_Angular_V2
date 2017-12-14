import { Component, OnInit } from '@angular/core';

@Component({

    template: `<h1>Admin</h1> 
            <chart type="pie" [data]="data"></chart>
        `
   
})

export class AdminComponent implements OnInit
{


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
    constructor() { }

    ngOnInit()
    {

    }
}