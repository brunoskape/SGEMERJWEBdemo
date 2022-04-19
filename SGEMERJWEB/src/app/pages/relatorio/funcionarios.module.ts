import { FuncionariosComponent } from './funcionarios/funcionarios.component';
import { FuncionariosRoutingModule } from './funcionarios-routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [FuncionariosComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    FuncionariosRoutingModule
  ]
})
export class FuncionariosModule {

}
