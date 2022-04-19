import { Component, ComponentRef, OnInit } from '@angular/core';
import {
  IModalDialog,
  IModalDialogButton,
  IModalDialogOptions,
} from 'ngx-modal-dialog';

@Component({
  selector: 'app-modal-lista',
  templateUrl: './modal-lista.component.html',
  styleUrls: ['./modal-lista.component.css'],
})
export class ModalListaComponent implements IModalDialog {
  public texto: string;
  public eventos: any[];
  constructor() {}
  dialogInit(
    reference: ComponentRef<IModalDialog>,
    options: Partial<IModalDialogOptions<any>>
  ) {
    this.texto = options.data.texto;
    this.eventos =  options.data.eventos;
  }
}
