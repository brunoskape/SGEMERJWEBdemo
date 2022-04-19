import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColaboradorListaComponent } from './colaborador-lista/colaborador-lista.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { ColaboradorRoutingModule } from './colaborador-routing.module';
import { ColaboradorFormularioComponent } from './colaborador-formulario/colaborador-formulario.component';
import { ModalColaboradorComponent } from './colaborador-modal/colaborador-modal.component';
import { ColaboradorRescisaoFormularioComponent } from '../colaborador-rescisao/colaborador-rescisao-formulario/colaborador-rescisao-formulario.component';



@NgModule({
  declarations: [
    ColaboradorListaComponent,
    ColaboradorFormularioComponent,
    ModalColaboradorComponent,
    ColaboradorRescisaoFormularioComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ColaboradorRoutingModule,
    SharedModule]
})
export class ColaboradorModule { }
