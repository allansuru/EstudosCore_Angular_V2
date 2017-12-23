import { Component, EventEmitter, OnInit, OnChanges, Input, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Vehicle, KeyValuePair } from './../../models/vehicle';
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

    private separaContatos: any = [];

    private readonly PAGE_SIZE = 99;
    query: any = {
        pageSize: this.PAGE_SIZE
    };
    queryResult: any = {};

    contatos: any = [];

    @Input() busca: string; //recomendado usar o decorator //input property
    @Output() buscaChange: EventEmitter<string> = new EventEmitter<string>();
 
    private termosDaBusca: Subject<string> = new Subject<string>();

    constructor(private vehicleService: VehicleService) {

    }
    private populateVehicles() {

  
        this.vehicleService.getVehicles(this.query)
            .subscribe(result => {
                this.queryResult = result;


                //separando meus contatos
                for (var i = 0; i < result.totalItems; i++) {
                    this.separaContatos.push(result.items[i].contact.name);
                }
                console.log(this.separaContatos);


                
            });
       
    }

    ngOnInit(): void {

       
        this.populateVehicles();


    }


    ngOnChanges(changes: SimpleChanges): void {
        console.log('change');
    }

    searchUp() {

        this.separaContatos.filter(f => {
            if (f === this.busca)
            {
                this.contatos.push(f);
                
            }
            else
            {
                console.log('termo nao funfou');
            }

        })
    }

    verDetalhe(c)
    {
        console.log('verDetalhes', c);
    }
}