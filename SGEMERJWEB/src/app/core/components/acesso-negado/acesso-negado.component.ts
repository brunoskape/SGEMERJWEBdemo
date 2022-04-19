import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-acesso-negado',
  templateUrl: './acesso-negado.component.html',
  styleUrls: ['./acesso-negado.component.css']
})
export class AcessoNegadoComponent implements OnInit {

  siglaDoSistema = environment.siglaDoSistema;
  descricaoSistema = environment.descricaoSistema;
  
  constructor() { }

  ngOnInit(): void {
  }

}
