import { Component, ComponentRef, OnInit } from '@angular/core';
import {
  IModalDialog,
  IModalDialogButton,
  IModalDialogOptions,
} from 'ngx-modal-dialog';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.css'],
})
export class ModalConfirmComponent implements IModalDialog {
  public texto: string;
  constructor() {}
  dialogInit(
    reference: ComponentRef<IModalDialog>,
    options: Partial<IModalDialogOptions<any>>
  ) {
    this.texto = options.data.texto;
  }
}
