import { MenuService } from './menu.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MenuItemModel } from './menu-item/menu-item.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  
  siglaDoSistema = environment.siglaDoSistema;
  descricaoSistema = environment.descricaoSistema;
  nomeDoSistema = environment.nomeDoSistema;


  constructor(public menuService:MenuService) {
         
  }


  ngOnInit() {}
}
