import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { SetorFormularioComponent } from './setor-formulario/setor-formulario.component';
import { SetorListaComponent } from './setor-lista/setor-lista.component';
import { SetorRoutingModule } from './setor-routing.module';
import { CoreModule } from 'src/app/core/core.module';


@NgModule({
  declarations: [
    SetorListaComponent,
    SetorFormularioComponent
  ],
  imports: [
    CommonModule,
    SetorRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class SetorModule {

 }
