import { Component, ComponentRef, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  IModalDialog,
  IModalDialogButton,
  IModalDialogOptions,
} from 'ngx-modal-dialog';
import { ReciboEsocialModel } from 'src/app/shared/models/recibo-esocial.model';
import { ReciboEsocialService } from 'src/app/shared/services/recibo-esocial.service';

@Component({
  selector: 'app-colaborador-modal',
  templateUrl: './colaborador-modal.component.html',
  styleUrls: ['./colaborador-modal.component.css'],
})
export class ModalColaboradorComponent implements IModalDialog {
  public modelForm: FormGroup;
  public protocolos: ReciboEsocialModel[] ;
  public idColaborador: number;

  constructor( protected recibosEsocialService: ReciboEsocialService) {}
  
  dialogInit(
    reference: ComponentRef<IModalDialog>,
    options: Partial<IModalDialogOptions<any>>
  ) {
    this.modelForm =  options.data.modelForm
    this.carregarListaRecibosPorColaborador()
  }

  public carregarListaRecibosPorColaborador(){
    const idColaborador  = this.modelForm.get("id").value;
    this.recibosEsocialService.getAllById(idColaborador)
    .subscribe(
      (retorno) => {
        if (retorno.data != null) {
          this.protocolos = retorno.data;
        } else if (retorno.status == 'NOK') {
          this.protocolos = [];
        }
      },
      (error) => {}
    );
  }
}
