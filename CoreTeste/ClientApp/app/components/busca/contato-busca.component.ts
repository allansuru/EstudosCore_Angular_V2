import { Component, EventEmitter, OnInit, OnChanges, Input, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Vehicle, KeyValuePair } from './../../models/vehicle';
import { Contato2 } from './../../models/contato2'
import { VehicleService } from './../../services/vehicle.service';


@Component({

    selector: 'contato-busca',
    templateUrl: 'contato-busca.component.html',
    styles: [`
            .cursor-pointer:hover {
                cursor: pointer;
            }
    `]

})

export class ContatoBuscaComponent implements OnInit, OnChanges {


    contato2: Contato2[] = [];
    recebeId: string;

    private readonly PAGE_SIZE = 99;
    query: any = {
        pageSize: this.PAGE_SIZE
    };
    queryResult: any = {};

    contatos: any = [];

    @Input() busca: string; //recomendado usar o decorator //input property
    @Output() buscaChange: EventEmitter<string> = new EventEmitter<string>();
 

    constructor(private vehicleService: VehicleService, private router: Router,) {

    }
    private populateVehicles() {

  
        this.vehicleService.getVehicles(this.query)
            .subscribe(result => {
                this.queryResult = result;


                //separando meus contatos
                for (var i = 0; i < result.totalItems; i++) {
                    this.contato2.push({ 'id': result.items[i].id, 'nome': result.items[i].contact.name })
                   
                }          
            });
       
    }

    ngOnInit(): void {

       
        this.populateVehicles();


    }


    ngOnChanges(changes: SimpleChanges): void {
    
    }

    searchUp() {

        this.contato2.filter(f => {
            if (f.nome === this.busca)
            {
                this.contatos.push(f);
                this.recebeId = f.id;

                
            }


        })
    }

    verDetalhe(c)
    {
        console.log('Id', this.recebeId);
        console.log('verDetalhes', c);

        this.router.navigate(['/vehicles/', this.recebeId]);


    }
}