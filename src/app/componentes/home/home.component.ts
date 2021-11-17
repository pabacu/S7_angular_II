
import { PresupuestoService } from './../../presupuesto.service';
import { Component, OnInit, Renderer2, ViewChild, ElementRef  } from '@angular/core';
import { PresupuestoClass } from 'src/app/models/presupuesto-class.model';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public presupuestos: Array<PresupuestoClass> = [];
  //public index: number = 0; //presupuesto actual
  public presupuesto: PresupuestoClass;
  @ViewChild('WebCheked') isWebchecked: ElementRef;
  showMore:boolean;

  constructor(private presuService : PresupuestoService, private renderer2: Renderer2) { 

  }

  ngOnInit(): void {
    this.presupuestos = this.presuService.get();
    this.showMore =false;
    this.presupuesto = this.presuService.presupuesto;
  }

  calcular(): void{

    let elements = document.querySelectorAll<HTMLInputElement>("input[type='checkbox']:checked");
    this.presuService.calcular(elements);      
  }

  calcularExtra(extra:{ id: number, cant: string}){
    this.presupuesto.setExtras(extra.id, extra.cant);
    this.calcular();
  }

  toogle(): void{
    if(this.showMore)
    {
      //this.removeMyClass();
      this.showMore = false;
    }else
      //this.addMyClass();
      this.showMore = true;
  }

  addMyClass(){
    this.renderer2.removeClass(this.isWebchecked.nativeElement, "hide");
    this.renderer2.addClass(this.isWebchecked.nativeElement, "visible");
  }

  removeMyClass(){
    
    this.renderer2.removeClass(this.isWebchecked.nativeElement, "visible");
    this.renderer2.addClass(this.isWebchecked.nativeElement, "hide");
  }

  


}
