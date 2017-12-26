import { Vehicle, KeyValuePair } from './../../models/vehicle';
import { VehicleService } from './../../services/vehicle.service';
import { Component, OnInit } from '@angular/core';
import { Auth } from "../../services/auth.service";

//estudos
import { Point, LikeComponent } from './../../models/estudos';


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

        //Estudos
        this.estudos();
    

        this.vehicleService.getMakes()
            .subscribe(m => this.makes = m);


        this.populateVehicles();

    }


    private populateVehicles() {
        console.log(this.query);
        this.vehicleService.getVehicles(this.query)
            .subscribe(result => {

                this.queryResult = result;
                console.log(this.queryResult);
            });

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



    estudos() {

        /** ESTUDOSS TYPESCRIPT **/


        /*Arrow Function exemple!
    
        //let doLog = (message) => {
    
        //    console.log('entrou');
        //    console.log(message);
        //    console.log('saiu');
        //}
    
    
        //doLog('ArroWF');
    
         /*Arrow Function exemple com interface!  */
        //let draw = (point: point) => console.log('point', point.x + point.y);
        //let getDistance = (pointA: point, pointB: point) => {
        //    console.log('Total', (pointA.x * pointA.y) + (pointB.x + pointB.y));
        //}

        //or

        //let draw = (point: point) => {
        //    //faz
        //    console.log('point', point.x + point.y);
        //}

        //draw({

        //    x: 1,
        //    y: 2
        //})
        //getDistance({
        //    x: 4,
        //    y: 5
        //},
        //    {
        //        x: 1,
        //        y: 2
        //    })

        //Usando classe no type script

        //let p: Point;

        //p = new Point();

        //console.log('soma classe', p.soma(1, 2));

  /*Arrow Function exemple com classes!  */

        let classeGo =  () => {
            let cp = new Point(100, 20);


            let value = cp.x = 10;

            console.log('X', value);

          
           
            
           // cp.x = 10, cp.y = 20;
           

            console.log('SOMA', cp.soma(1, 2));
            console.log('SOMA POINTS', cp.somaPoints());
        }
        classeGo()


        //Testando o Like


        let like = new LikeComponent(10, true);

      //  like.onClick()
        like.onClick();

        console.log(`likesCount: ${like.likesCount}, isSelected: ${like.isSelected}`);

       


        /** ESTUDOSS TYPESCRIPT **/

    }
}




//procure usar class sempre
interface point 
{
    x: number,
    y: number
}

