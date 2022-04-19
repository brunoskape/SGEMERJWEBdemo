import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoBeneficioRoutingModule } from './tipo-beneficio-routing.module';
import { TipoBeneficioListaComponent } from './tipo-beneficio-lista/tipo-beneficio-lista.component';
import { TipoBeneficioFormularioComponent } from './tipo-beneficio-formulario/tipo-beneficio-formulario.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    TipoBeneficioListaComponent,
    TipoBeneficioFormularioComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    TipoBeneficioRoutingModule,
    SharedModule
  ]
})
export class TipoBeneficioModule { }
