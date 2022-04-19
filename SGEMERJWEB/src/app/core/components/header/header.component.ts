import { Component, OnInit } from '@angular/core';
import { AutoContrasteService } from 'src/app/shared/directives/autocontraste.directive';
import { environment } from 'src/environments/environment';
import { AutenticacaoService } from './../../services/autenticacao.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  siglaDoSistema = environment.siglaDoSistema;
  year = new Date().getFullYear();
  version = environment.version;
  apiVersion = environment.apiVersion;
  production = environment.production;
  ambiente = environment.ambiente;
  descricaoSistema = environment.descricaoSistema;

  constructor(
    public autoContrasteService: AutoContrasteService,
    public autenticacao: AutenticacaoService
  ) {}
  ngOnInit(): void {
  
  }

  logout(){
    this.autenticacao.logout();
  }
}
