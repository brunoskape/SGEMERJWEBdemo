import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColaboradorModule } from './colaborador.module';
import { ColaboradorListaComponent } from './colaborador-lista/colaborador-lista.component';
import { ColaboradorFormularioComponent } from './colaborador-formulario/colaborador-formulario.component';
import { AutenticacaoGuard } from 'src/app/core/guards/autenticacao.guard';
import { ColaboradorRescisaoFormularioComponent } from '../colaborador-rescisao/colaborador-rescisao-formulario/colaborador-rescisao-formulario.component';

const routes: Routes = [
  { path: '', component: ColaboradorListaComponent },
  {
    path: 'novo',
    component: ColaboradorFormularioComponent,
    canActivate: [AutenticacaoGuard],
    pathMatch: 'full',
  },
  {
    path: ':id/alteracao',
    component: ColaboradorFormularioComponent,
    canActivate: [AutenticacaoGuard],
    pathMatch: 'full',
  },
  {
    path: 'rescisao/:id/novo',
    component: ColaboradorRescisaoFormularioComponent,
    canActivate: [AutenticacaoGuard],
    pathMatch: 'full',
  },
  {
    path: 'rescisao/:id/alteracao',
    component: ColaboradorRescisaoFormularioComponent,
    canActivate: [AutenticacaoGuard],
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ColaboradorRoutingModule {}
