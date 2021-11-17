import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
//import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PresupuestoClass } from 'src/app/models/presupuesto-class.model';
import { PresupuestoService } from './../../presupuesto.service';

@Component({
  selector: 'app-panell',
  templateUrl: './panell.component.html',
  styleUrls: ['./panell.component.css'],
  animations: [ 
    
    /*trigger('openClose', [
    
    state('open', style({
      height:'100%',
      width:'350px'
    })),
    state('closed', style({
      height:'0px',
      width:'0px'
    })),
    transition('open => closed', [
      animate('1s')
    ]),
    transition('closed => open', [
      animate('0.5s')
    ])
  ])*/
  trigger('simpleFadeAnimation', [

    // the "in" style determines the "resting" state of the element when it is visible.
    state('in', style({opacity: 1})),

    // fade in when created. this could also be written as transition('void => *')
    transition(':enter', [
      style({opacity: 0}),
      animate(600 )
    ]),

    // fade out when destroyed. this could also be written as transition('void => *')
    transition(':leave',
      animate(600, style({opacity: 0})))
  ])
  ]
})
export class PanellComponent implements OnInit {

  @Input() public presupuesto: PresupuestoClass;
  @Output() OnExtraschange = new EventEmitter<{id: number, cant: string}>();
  public idItem : number;
  public cant: string;

  // the logical has been moved to the children
  //extraForm : FormGroup;

  constructor(private presuService : PresupuestoService/*, private _builder: FormBuilder*/) {
    // the logical has been moved to the children
    // this.extraForm = this._builder.group(
    //   {
    //     cantidad_0: ['', Validators.required],
    //     cantidad_1: ['', Validators.required]
    //   }
    //   )
      
   }

  ngOnInit(): void {
    this.presupuesto = this.presuService.presupuesto;

  }

  ExtrasUpdate(_id: number, _cant: string) {
    this.idItem = _id;
    this.cant = _cant;
    let extraItem = {id: this.idItem, cant: this.cant};
    this.OnExtraschange.emit(extraItem);
  }

}
