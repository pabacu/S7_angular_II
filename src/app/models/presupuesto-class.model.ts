import { Presupuesto } from './presupuesto.model';
export class PresupuestoClass implements Presupuesto {
   id: number;
   fecha: Date;
   descripcion: string; 
   total: number;
   cliente: string;

   private extras: Array<{ titulo: string, cant: number, precio: number }> = [];

   constructor(id: number, fecha: Date, descripcion: string, total: number, cliente: string) {
    this.id = id;
    this.fecha = fecha;
    this.descripcion = descripcion;
    this.total = total;
    this.cliente = cliente;
    this.extras = [
      { titulo: "Número de páginas", cant: 1, precio: 30 },
      { titulo: "Número de idiomas.", cant: 1, precio: 30 }
      //Add more extras if you needed
    ];
  }
  

  public get(): PresupuestoClass {
    return this;
  }

  public getTotal(): number {
    return this.total;
  }

  public setTotal(_total:number):void {
    this.total = _total;
  }

  public getExtras(): Array<{ titulo: string, cant: number, precio: number }>{
    return this.extras;
  }

  public setExtras( id: number, cant: string)
  {
    try {
      this.extras[id].cant = parseInt(cant);
    } catch (error) {
      console.log('[set extras] Ocurrio un error, '+error);
    }
  }
}
