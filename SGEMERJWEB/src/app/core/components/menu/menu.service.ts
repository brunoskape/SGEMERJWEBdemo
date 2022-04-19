import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { PermissionModel } from '../../model/permission-model';
import { MenuItemModel } from './menu-item/menu-item.component';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  public urlsAutorizadasDoUsuario: Array<string> = [];

  public menus: Array<MenuItemModel> = [];

  private menuItem: MenuItemModel;

  private menuItemFilho: MenuItemModel;

  public activatedRouter: ActivatedRouteSnapshot;

  constructor() {}

  public montarMenuEConcederPermissoes(permissoes: Array<PermissionModel>) {
    this.montarMenu();
    this.urlsAutorizadasDoUsuario = ['home'];
    this.menus = this.concederPermissoes(this.menus, permissoes);
  }

  private montarMenu() {
    this.menus = [];
    this.menuItem = new MenuItemModel();
    this.menuItem.id = 1;
    this.menuItem.texto = 'Página inicial';
    this.menuItem.acao = ['home'];
    this.menuItem.urlsQueRepresenta = ['home'];
    this.menuItem.icone = 'home';
    this.menus.push(this.menuItem);

    this.menuItem = new MenuItemModel();
    this.menuItem.id = 2;
    this.menuItem.texto = 'Tabelas';
    this.menuItem.acao = null;
    this.menuItem.icone = 'table';

    this.menuItemFilho = new MenuItemModel();
    this.menuItemFilho.id = 3;
    this.menuItemFilho.texto = 'Setor';
    this.menuItemFilho.acao = ['setor'];
    this.menuItemFilho.siglaFunc = 'CAD_SETOR';
    this.menuItemFilho.urlsQueRepresenta = [
      'setor',
      'setor/novo',
      'setor/:id/alteracao',
    ];
    this.menuItemFilho.icone = 'copy';

    this.menuItem.filhos.push(this.menuItemFilho);

    this.menuItemFilho = new MenuItemModel();
    this.menuItemFilho.id = 3;
    this.menuItemFilho.texto = 'Tipo Benefício';
    this.menuItemFilho.acao = ['tipo-beneficio'];
    this.menuItemFilho.siglaFunc = 'CAD_SETOR';
    this.menuItemFilho.urlsQueRepresenta = [
      'tipo-beneficio',
      'tipo-beneficio/novo',
      'tipo-beneficio/:id/alteracao',
    ];
    this.menuItemFilho.icone = 'copy';

    this.menuItem.filhos.push(this.menuItemFilho);

    this.menus.push(this.menuItem);

    this.menuItem = new MenuItemModel();
    this.menuItem.id = 5;
    this.menuItem.texto = 'Colaborador';
    this.menuItem.acao = null;
    this.menuItem.icone = 'user';

    this.menuItemFilho = new MenuItemModel();
    this.menuItemFilho.id = 6;
    this.menuItemFilho.texto = 'Consulta';
    this.menuItemFilho.siglaFunc = 'CAD_COLAB';
    this.menuItemFilho.acao = ['colaborador'];
    this.menuItemFilho.urlsQueRepresenta = ['colaborador',
                                            'colaborador/rescisao/:id/novo',
                                            'colaborador/rescisao/:id/alteracao'
                                                  ];
    this.menuItemFilho.icone = 'search';

    this.menuItem.filhos.push(this.menuItemFilho);

    this.menuItemFilho = new MenuItemModel();
    this.menuItemFilho.id = 7;
    this.menuItemFilho.texto = 'Cadastro';
    this.menuItemFilho.siglaFunc = 'CAD_COLAB';
    this.menuItemFilho.acao = ['colaborador/novo'];
    this.menuItemFilho.urlsQueRepresenta = [
      'colaborador/novo',
      'colaborador/:id/alteracao',
    ];
    this.menuItemFilho.icone = 'plus';

    this.menuItem.filhos.push(this.menuItemFilho);

    this.menus.push(this.menuItem);

    this.menuItem = new MenuItemModel();
    this.menuItem.id = 6;
    this.menuItem.texto = 'eSocial';
    this.menuItem.acao = null;
    this.menuItem.icone = 'share-square';

    this.menuItemFilho = new MenuItemModel();
    this.menuItemFilho.id = 8;
    this.menuItemFilho.texto = 'Envio de Eventos';
    this.menuItemFilho.siglaFunc = 'ESOCIAL_EVENTO';
    this.menuItemFilho.acao = ['evento-esocial'];
    this.menuItemFilho.urlsQueRepresenta = ['evento-esocial'];
    this.menuItemFilho.icone = 'share';

    this.menuItem.filhos.push(this.menuItemFilho);

    this.menuItemFilho = new MenuItemModel();
    this.menuItemFilho.id = 9;
    this.menuItemFilho.texto = 'Relatório';
    this.menuItemFilho.siglaFunc = 'ESOCIAL_RETORNO';
    this.menuItemFilho.acao = ['evento-esocial/relatorio'];
    this.menuItemFilho.urlsQueRepresenta = ['evento-esocial/relatorio'];
    this.menuItemFilho.icone = 'file-alt';

    this.menuItem.filhos.push(this.menuItemFilho);
    this.menus.push(this.menuItem);


    this.menuItem = new MenuItemModel();
    this.menuItem.id = 7;
    this.menuItem.texto = 'Relatório';
    this.menuItem.acao = null;
    this.menuItem.icone = 'file-alt';

    this.menuItemFilho = new MenuItemModel();
    this.menuItemFilho.id = 10;
    this.menuItemFilho.texto = 'Funcionários Ativos';
    this.menuItemFilho.siglaFunc = 'RELATORIO_FUNC';
    this.menuItemFilho.acao = ['relatorio/funcionariosativos'];
    this.menuItemFilho.urlsQueRepresenta = ['relatorio/funcionariosativos'];
    this.menuItemFilho.icone = 'users';

    this.menuItem.filhos.push(this.menuItemFilho);
    this.menus.push(this.menuItem);
  }

  private concederPermissoes(
    itemsDeMenu: Array<MenuItemModel>,
    permissoes: Array<PermissionModel>
  ): Array<MenuItemModel> {
    itemsDeMenu.forEach((element) => {
      if (element.filhos != null && element.filhos.length > 0) {
        element.filhos = this.concederPermissoes(element.filhos, permissoes);
      } else {
        if (element.siglaFunc != null) {
          const temPermissao = permissoes.find(
            (x) => x.siglaFunc == element.siglaFunc && x.indAutorizado == 'S'
          );

          if (temPermissao == undefined || temPermissao == null) {
            itemsDeMenu = itemsDeMenu.filter((x) => x != element);
          } else {
            element.urlsQueRepresenta.forEach((url) => {
              this.urlsAutorizadasDoUsuario.unshift(url);
            });
          }
        }
      }
    });
    return itemsDeMenu;
  }
}
