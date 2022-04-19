import { AcessoNegadoComponent } from './core/components/acesso-negado/acesso-negado.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';
import { AutenticacaoGuard } from './core/guards/autenticacao.guard';
import { NaoEncontradoComponent } from './core/components/nao-encontrado/nao-encontrado.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canLoad: [AutenticacaoGuard], canActivate: [AutenticacaoGuard]},
  { path: 'setor', loadChildren: () => import('src/app/pages/setor/setor-routing.module')
    .then(m => m.SetorRoutingModule),
    canLoad: [AutenticacaoGuard], canActivate: [AutenticacaoGuard]
  },
  { path: 'colaborador', loadChildren: () => import('src/app/pages/colaborador/colaborador-routing.module')
    .then(m => m.ColaboradorRoutingModule),
    canLoad: [AutenticacaoGuard], canActivate: [AutenticacaoGuard]
  },
  { path: 'evento-esocial', loadChildren: () => import('src/app/pages/esocial/esocial-routing.module')
    .then(m => m.EsocialRoutingModule),
    canLoad: [AutenticacaoGuard], canActivate: [AutenticacaoGuard]
  },
  { path: 'tipo-beneficio', loadChildren: () => import('src/app/pages/tipo-beneficio/tipo-beneficio-routing.module')
    .then(m => m.TipoBeneficioRoutingModule),
    canLoad: [AutenticacaoGuard], canActivate: [AutenticacaoGuard]
  },
  { path: 'relatorio', loadChildren: () => import('src/app/pages/relatorio/funcionarios-routing.module')
    .then(m => m.FuncionariosRoutingModule),
    // canLoad: [AutenticacaoGuard], canActivate: [AutenticacaoGuard]
  },
  { path: 'acesso-negado', component: AcessoNegadoComponent },
  { path: '**', component: NaoEncontradoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

