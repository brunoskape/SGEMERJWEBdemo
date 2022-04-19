import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { EsocialRoutingModule } from './esocial-routing.module';

import { S2300ListaComponent } from './s2300-lista/s2300-lista.component';
import { EsocialRelatorioComponent } from './esocial-relatorio/esocial-relatorio.component';
import { ModalListaErrosComponent } from './modal-lista-erros/modal-lista-erros.component';



@NgModule({
  declarations: [
    S2300ListaComponent,
    EsocialRelatorioComponent,
    ModalListaErrosComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    EsocialRoutingModule,
    SharedModule]
})
export class EsocialModule { }
