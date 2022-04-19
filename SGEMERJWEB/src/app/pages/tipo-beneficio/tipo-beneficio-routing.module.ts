import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutenticacaoGuard } from 'src/app/core/guards/autenticacao.guard';
import { TipoBeneficioFormularioComponent } from './tipo-beneficio-formulario/tipo-beneficio-formulario.component';
import { TipoBeneficioListaComponent } from './tipo-beneficio-lista/tipo-beneficio-lista.component';

const routes: Routes = [
  { path: '', component: TipoBeneficioListaComponent },
  {
    path: 'novo',
    component: TipoBeneficioFormularioComponent,
    canActivate: [AutenticacaoGuard],
    pathMatch: 'full',
  },
  {
    path: ':id/alteracao',
    component: TipoBeneficioFormularioComponent,
    canActivate: [AutenticacaoGuard],
    pathMatch: 'full',
  },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TipoBeneficioRoutingModule { 

}
