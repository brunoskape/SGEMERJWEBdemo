import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SetorListaComponent } from './setor-lista/setor-lista.component';
import { SetorFormularioComponent } from './setor-formulario/setor-formulario.component';
import { AutenticacaoGuard } from 'src/app/core/guards/autenticacao.guard';

const routes: Routes = [
  { path: '', component: SetorListaComponent },
  {
    path: 'novo',
    component: SetorFormularioComponent,
    canActivate: [AutenticacaoGuard],
  },
  {
    path: ':id/alteracao',
    component: SetorFormularioComponent,
    canActivate: [AutenticacaoGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetorRoutingModule {}
