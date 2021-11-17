import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-calculate-input',
  templateUrl: './calculate-input.component.html',
  styleUrls: ['./calculate-input.component.css']
})
export class CalculateInputComponent implements OnInit {

  @Input() public presuExtra: {titulo: string, cant: number, precio: number};
  //@Input() public extraForm : FormGroup;
  @Input() public index:number;

  @Output() OnExtraschangeChild = new EventEmitter<{id: number, cant: string}>();
  
  public extraItem : {id: number, cant: string};
  extraForm : FormGroup;
  modalOptions:NgbModalOptions;
  closeResult: string;
  
  constructor(private _builder: FormBuilder, private ngbModalRef: NgbModal) { 
    this.extraForm = this._builder.group(
      {
        cantidad_0: ['', Validators.required],
        cantidad_1: ['', Validators.required]
      }
      )
      
  }

  ngOnInit(): void {
    this.modalOptions = {backdrop: true,size: 'lg', keyboard: true, centered: true};
  }

  ExtrasUpdateChild(id: number, cant: string) {
    this.extraItem = {id: id, cant: cant};
    console.log("reached here: " + JSON.stringify(this.extraItem));
    this.OnExtraschangeChild.emit(this.extraItem);
  }
 
  opera(id:number, cant:number)
  {
    if(this.presuExtra.cant + (cant)>=0)
    {
      this.presuExtra.cant += cant;
      this.extraItem = {id: id, cant: this.presuExtra.cant.toString()};
      this.OnExtraschangeChild.emit(this.extraItem);
    }
  }

   openModal(ModalComponent:string) {
     this.ngbModalRef.open(ModalComponent, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
   }

   private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
