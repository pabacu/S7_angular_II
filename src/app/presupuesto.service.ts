import { PresupuestoClass } from './models/presupuesto-class.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PresupuestoService {

  public presupuestos: Array<PresupuestoClass> = [];
  public presupuesto:PresupuestoClass;

  constructor() {
    this.presupuesto = new PresupuestoClass(1,new Date(),'', 0, '');
   }

  get(): Array<PresupuestoClass> {
    return this.presupuestos.sort((a, b) => (a.id < b.id ? -1 : 1));;
  }

  next():number{
    return this.presupuestos.length+1;
  }

  calcular(elements:NodeListOf<HTMLInputElement>): void{
    let total = 0;
    let extras_checked : boolean = false;

    elements.forEach(function(checkbox) {
      if(checkbox.checked)
      {
        try {
          if(checkbox.name === 'web')
          {
            extras_checked = true;
          }
          total += parseInt(checkbox.value);  
        } catch (error) {
          total +=0;
        }
           
      }
    });
    
    if(extras_checked)
    {
      total += this.calcularExtras();
    }

    this.presupuesto.setTotal(total);

  }

  public calcularExtras():number{
    let totalE:number = 0;
    this.presupuesto.getExtras().forEach(element => {
      totalE += element.cant * element.precio;
    });
    return totalE;
  }

  public save(presu:PresupuestoClass)
  {
    this.presupuestos.push(presu);
    this.presupuesto = new PresupuestoClass(this.next(),new Date(),'', 0, '');
  }

}
