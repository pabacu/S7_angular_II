
import { PresupuestoService } from './../../presupuesto.service';
import { Component, OnInit, Renderer2, ViewChild, ElementRef  } from '@angular/core';
import { PresupuestoClass } from 'src/app/models/presupuesto-class.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ParamsClass } from 'src/app/models/params-model';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public presupuestos: Array<PresupuestoClass> = [];
  //public index: number = 0; //presupuesto actual
  public presupuesto: PresupuestoClass;
  private homeParams: ParamsClass;

  @ViewChild('WebCheked') isWebchecked: ElementRef;
  showMore:boolean;

  constructor(private presuService : PresupuestoService, private renderer2: Renderer2, private route: ActivatedRoute) { 

  }

  ngOnInit(): void {
    this.presupuestos = this.presuService.get();
    this.showMore =false;
    this.presupuesto = this.presuService.presupuesto;
    this.homeParams = new ParamsClass();

    //routing
    this.route.queryParams.subscribe( params => { console.log(params); this.getParameters(params); });
  }

  getParameters(params: Params) {
    if(params.hasOwnProperty('paginaWeb'))
    {
      this.homeParams.paginaWeb = params.paginaWeb == 'true';
      let element = document.querySelector<HTMLInputElement>("input[name='web']");
      element.checked = params.paginaWeb == 'true';
      this.showMore = this.homeParams.paginaWeb;
    }
    if(params.hasOwnProperty('campaniaSeo'))
    {
      this.homeParams.campaniaSeo = params.campaniaSeo == 'true';
      let element = document.querySelector<HTMLInputElement>("input[name='seo']");
      element.checked = params.campaniaSeo == 'true';
      this.showMore = this.homeParams.campaniaSeo;
    }
    if(params.hasOwnProperty('campaniaAds'))
    {
      this.homeParams.campaniaAds = params.campaniaAds;
      let element = document.querySelector<HTMLInputElement>("input[name='ads']");
      element.checked = params.campaniaAds == 'true';
      this.showMore = this.homeParams.campaniaAds;
    }
    if(params.hasOwnProperty('nPaginas'))
    {
      this.homeParams.nPaginas = params.nPaginas;
      this.presupuesto.setExtras(0,this.homeParams.nPaginas.toString());
    }
    if(params.hasOwnProperty('nIdiomas'))
    {
      this.homeParams.nIdiomas = params.nIdiomas;
      this.presupuesto.setExtras(1,this.homeParams.nIdiomas.toString());
    }
    this.calcular();
  }

  calcular(): void{

    let elements = document.querySelectorAll<HTMLInputElement>("input[type='checkbox']:checked");
    this.presuService.calcular(elements);      
  }

  reiniciar():void{
    let elements = document.querySelectorAll<HTMLInputElement>("input[type='checkbox']:checked");
    elements.forEach(element => {
      element.checked = false;
    });
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

  save(presu:PresupuestoClass):void{
    this.presuService.save(presu);
    this.ngOnInit();
    this.reiniciar();
    this.calcular();
  }


}
