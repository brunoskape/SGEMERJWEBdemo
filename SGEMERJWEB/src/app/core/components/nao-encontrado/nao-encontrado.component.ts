import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-nao-encontrado',
  templateUrl: './nao-encontrado.component.html',
  styleUrls: ['./nao-encontrado.component.css']
})
export class NaoEncontradoComponent implements OnInit {

  siglaDoSistema = environment.siglaDoSistema;
  descricaoSistema = environment.descricaoSistema;
  
  constructor() { }

  ngOnInit(): void {
  }

}
