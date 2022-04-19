import { ComboService } from 'src/app/shared/services/combos.service';
import { UtilService } from './../../../shared/services/util.service';
import { Component, OnInit } from '@angular/core';
import { ColaboradorModel } from '../shared/colaborador.model';
import { TipoColaboradorModel } from '../shared/tipoColaborador.model';
import { ColaboradorService } from '../shared/colaborador.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { TipoColaboradorService } from '../shared/tipoColaborador.service';

@Component({
  selector: 'app-colaborador-lista',
  templateUrl: './colaborador-lista.component.html',
  styleUrls: ['./colaborador-lista.component.css'],
})
export class ColaboradorListaComponent implements OnInit {
  //variáveis para ordernar
  public responsive: boolean = true;
  public labels: any = {
    previousLabel: 'Anterior',
    nextLabel: 'Próximo',
    screenReaderPaginationLabel: 'Paginação',
    screenReaderPageLabel: 'página',
    screenReaderCurrentLabel: `página corrente`,
  };

  //variáveis do filtro
  public filtroNome: string = '';
  public filtroCpf: string = '';
  public filtroTipoColaborador: string = '0';

  //variaveis de ordenação
  public key: string = 'nome';
  public desc: boolean = false;

  //lista de colabores e dropdown de tipos do filtro
  public colaboradores: ColaboradorModel[];
  public tiposColaborador: TipoColaboradorModel[];

  public config = {
    id: 'custom',
    itemsPerPage: 10,
    currentPage: '1',
    totalItems: 27,
  };

  constructor(
    private colaboradorService: ColaboradorService,
    private tiposColaboradorService: TipoColaboradorService,
    private toastr: ToastrService,
    protected route: ActivatedRoute,
    protected router: Router,
    private utilService: UtilService,
    public comboService:ComboService
  ) {}

  ngOnInit(): void {
    this.obterComboTipoColaborador();
  }

  public obterComboTipoColaborador() {
    this.utilService.showLoading();
    this.tiposColaboradorService.getAll().subscribe(
      (retorno) => {
        this.utilService.showLoading(false);
        this.tiposColaborador = retorno.data;
      },
      (error) => this.errorMessage(error)
    );
  }

  public getColaboradores() {    
    this.utilService.showLoading();
    let params = new HttpParams();
    params = params.append('c', this.filtroCpf);
    params = params.append('n', this.filtroNome);
    params = params.append('t', this.filtroTipoColaborador);
    params = params.append('p', this.config.currentPage);

    this.colaboradorService.getByFilter(params).subscribe(
      (retorno) => {
        if (retorno.data != null) {
          this.colaboradores = retorno.data;
          this.config.totalItems = retorno.totalRegistro;
        } else if (retorno.status == 'NOK') {
          this.colaboradores = [];
          this.toastr.error(retorno.mensagem);
        }
        this.utilService.showLoading(false);
      },
      (error) => this.errorMessage(error)
    );
  }

  public edit(colaborador): void {
    const baseComponentPath: string = this.route.snapshot.parent.url[0].path;
    //recarrega o componente com o recurso criado e permite edição
    this.router
      .navigateByUrl(baseComponentPath, { skipLocationChange: true })
      .then(() =>
        this.router.navigate([
          baseComponentPath,
          colaborador.idDoTipo,
          'alteracao',
        ])
      );
  }

  public clear(): void {
    this.filtroTipoColaborador = null;
    this.filtroCpf = '';
    this.filtroNome = '';
    this.colaboradores = undefined;
    this.config.totalItems = 0;
    this.config.currentPage = '1';
  }

  public new() {
    const baseComponentPath: string = this.route.snapshot.parent.url[0].path;
    //retorna para o componente de listagem
    this.router.navigate([baseComponentPath, 'novo']);
  }

  rescisao(colaborador: ColaboradorModel) {
    const baseComponentPath: string = this.route.snapshot.parent.url[0].path;

    if(colaborador.rescisao.id == 0){
      this.router.navigate( [baseComponentPath,'rescisao', colaborador.idDoTipo,'novo']);
    } else {
    //retorna para o componente de listagem
    this.router.navigate( [baseComponentPath,'rescisao', colaborador.idDoTipo,'alteracao']);
    }
}

  public search() {
    this.config.currentPage = '1';
    this.getColaboradores();
  }

  protected errorMessage(error: any) {
    this.utilService.showLoading(false);
    this.toastr.error('Ocorreu um erro ao processar a sua solicitação!');
  }

  sort(key: string) {
    this.key = key;
    this.desc = !this.desc;
  }

  onPageChange(event) {
    this.config.currentPage = event;
    this.getColaboradores();
  }
}
