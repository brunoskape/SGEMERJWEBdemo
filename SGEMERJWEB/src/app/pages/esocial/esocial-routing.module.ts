import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EsocialModule } from './esocial.module';

import { AutenticacaoGuard } from 'src/app/core/guards/autenticacao.guard';
import { S2300ListaComponent } from './s2300-lista/s2300-lista.component';
import { EsocialRelatorioComponent } from './esocial-relatorio/esocial-relatorio.component';

const routes: Routes = [
  { path: '', component: S2300ListaComponent },
  { path: 'relatorio', component: EsocialRelatorioComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EsocialRoutingModule {}
