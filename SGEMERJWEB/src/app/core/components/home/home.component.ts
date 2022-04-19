import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  
  siglaDoSistema = environment.siglaDoSistema;
  descricaoSistema = environment.descricaoSistema;
  nomeDoSistema = environment.nomeDoSistema;

  constructor() {}

  ngOnInit(): void {}
}
