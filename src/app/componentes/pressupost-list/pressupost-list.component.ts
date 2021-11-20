import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { PresupuestoClass } from 'src/app/models/presupuesto-class.model';
import { PresupuestoService } from 'src/app/presupuesto.service';

@Component({
  selector: 'app-pressupost-list',
  templateUrl: './pressupost-list.component.html',
  styleUrls: ['./pressupost-list.component.css']
})
export class PressupostListComponent implements OnInit {

  @Input() public presupuestos: Array<PresupuestoClass>;
  constructor(private presuService : PresupuestoService, private renderer2: Renderer2) { }

  ngOnInit(): void {
  }

  ordenraAz(){
    
    this.presupuestos = this.presupuestos.sort((a, b) => (a.descripcion < b.descripcion ? -1 : 1));
  }

  ordenarfecha(){
    this.presupuestos = this.presupuestos.sort((a, b) => (a.fecha < b.fecha ? -1 : 1));
  }

  ordenarReset(){
    
    this.presupuestos = this.presuService.get();
  }

  buscarDescripcion(search:string)
  {
    if(search==='')
    {
      this.ordenarReset();
    }else
    if(this.presuService.get().length > 0)
    {
     this.presupuestos = [];
     this.presupuestos.push(this.presuService.get().find(x => x.descripcion.lastIndexOf(search)>=0));
    }
  }

}
