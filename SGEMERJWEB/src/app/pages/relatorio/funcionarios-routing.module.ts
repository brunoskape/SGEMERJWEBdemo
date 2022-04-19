import { AutenticacaoGuard } from 'src/app/core/guards/autenticacao.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuncionariosComponent } from './funcionarios/funcionarios.component';

const routes: Routes = [
  { path: 'funcionariosativos', component: FuncionariosComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FuncionariosRoutingModule {}
