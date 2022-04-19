import { UtilService } from './../../../shared/services/util.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  faCheckCircle,
  faEdit,
  faSearch,
  faSort,
} from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { SetorModel } from '../shared/setor.model';
import { SetorService } from '../shared/setor.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-setor-lista',
  templateUrl: './setor-lista.component.html',
  styleUrls: ['./setor-lista.component.css'],
})
export class SetorListaComponent implements OnInit {
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
  public filtroSigla: string = '';
  public filtroDescricao: string = '';

  //variaveis de ordenação
  public key: string = 'sigla';
  public desc: boolean = false;

  /*[ totalItens: 999,
      setoresPorPagina:[
        SetorService...
      ]]
  */

  //lista de setores
  public setores: SetorModel[];

  public config = {
    id: 'custom',
    itemsPerPage: 10,
    currentPage: '1',
    totalItems: 27,
  };

  constructor(
    private setorService: SetorService,
    private toastr: ToastrService,
    protected route: ActivatedRoute,
    protected router: Router,
    protected utilService: UtilService
  ) {}

  ngOnInit(): void {}

  public getSetores() {
    this.utilService.showLoading();
    let params = new HttpParams();
    params = params.append('s', this.filtroSigla);
    params = params.append('d', this.filtroDescricao);
    params = params.append('p', this.config.currentPage);

    this.setorService.getByFilter(params).subscribe(
      (retorno) => {
        if (retorno.data != null) {
          this.setores = retorno.data;
          this.config.totalItems = retorno.totalRegistro;
        } else if (retorno.status == 'NOK') {
          this.setores = [];
          this.toastr.error(retorno.mensagem);
        }

        this.utilService.showLoading(false);
      },
      (error) => this.errorMessage(error)
    );
  }

  public edit(setor): void {
    const baseComponentPath: string = this.route.snapshot.parent.url[0].path;

    //recarrega o componente com o recurso criado e permite edição
    this.router
      .navigateByUrl(baseComponentPath, { skipLocationChange: true })
      .then(() =>
        this.router.navigate([baseComponentPath, setor.id, 'alteracao'])
      );
  }

  public clear(): void {
    this.filtroSigla = '';
    this.filtroDescricao = '';
    this.setores = undefined;
    this.config.totalItems = 0;
    this.config.currentPage = '1';
  }

  public new() {
    const baseComponentPath: string = this.route.snapshot.parent.url[0].path;
    //retorna para o componente de listagem
    this.router.navigate([baseComponentPath, 'novo']);
  }

  public search() {
    this.getSetores();
    this.config.currentPage = '1';
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
    this.getSetores();
  }
}
