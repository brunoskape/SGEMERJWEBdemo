import { Component, Input, OnInit } from '@angular/core';
import {
  ActivatedRoute,

  Router
} from '@angular/router';

@Component({
  selector: 'app-menu-item',
  template: `
    <a
      *ngIf="item.filhos.length == 0 && item.acao != null"
      data-toggle="collapse"
      data-target="#sidebarMenu.show"
      [routerLink]="item.acao"
      [id]="item.id"
      href="#"
      class="list-group-item "
      [attr.data-parent]="'#' + parent"
      [ngClass]="item.ehParaAtivar(urlAtiva) ? 'rota-ativa' : 'rota-inativa'"
      [routerLinkActiveOptions]="{ exact: true }"
      ><fa-icon
        *ngIf="item.icone != ''"
        [icon]="item.icone"
        class="mr-3"
      ></fa-icon
      >{{ item.texto }}
      <fa-icon icon="check" class="icone float-right"></fa-icon>
    </a>

    <a
      *ngIf="item.filhos.length > 0"
      href="#"
      class="list-group-item"
      data-toggle="collapse"
      [attr.data-target]="'#menu' + item.id + '-S'"
      aria-expanded="false"
      [attr.aria-controls]="item.id"
    >
      <fa-icon
        *ngIf="item.icone != ''"
        [icon]="item.icone"
        class="mr-3"
      ></fa-icon
      >{{ item.texto
      }}<fa-icon
        icon="angle-double-right"
        class="text-collapsed float-right"
      ></fa-icon
      ><fa-icon
        icon="angle-double-down"
        class="text-expanded float-right"
      ></fa-icon>
    </a>
    <div
      *ngIf="item.filhos.length > 0"
      [id]="'menu' + item.id + '-S'"
      class="collapse pl-2"
      [attr.data-parent]="'#' + parent"
    >
      <app-menu-item
        [item]="itemDoMenu"
        *ngFor="let itemDoMenu of item.filhos"
        [parent]="'menu' + item.id + '-S'"
      ></app-menu-item>
    </div>
  `,
  styles: [
    `
      .list-group-item[aria-expanded='false'] .text-expanded {
        display: none;
      }
      .list-group-item[aria-expanded='true'] .text-collapsed {
        display: none;
      }
      .list-group-item {
        background-color: transparent;
        color: white;
        text-decoration: none;
        border: none;
      }

      .list-group-item:hover {
        background-color: white;
        color: black;
        text-decoration: none;
      }

      .rota-ativa .icone {
        display: inline;
      }

      .rota-inativa .icone {
        display: none;
      }
    `,
  ],
})
export class MenuItemComponent implements OnInit {
  @Input('item') item: any;
  @Input('parent') parent: string;

  constructor(
    protected router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  get urlAtiva() {
    let url = this.router.url;
    if (url.startsWith('/'))
      url = url.slice(1, url.length);
    return url.replace(new RegExp('[0-9]', 'g'), '');    
  }
}

export class MenuItemModel {
  public id: number;
  public texto: string;
  public acao: string[] = null;
  public icone: string = '';
  public filhos: Array<MenuItemModel> = [];
  public siglaFunc: string = null;
  public urlsQueRepresenta: string[] = ['nao-encontrada'];

  constructor() {}

  public ehParaAtivar(url: string) {
    const existe = this.urlsQueRepresenta.find((x) => {
      return x.replace(":id",'') == url;
    });

    return existe != null;
  }
}
