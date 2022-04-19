import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../../shared/services/util.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpParams } from '@angular/common/http';
import { TipoBeneficioModel } from '../../tipo-beneficio/shared/tipo-beneficio.model';
import { TipoBeneficioService } from '../../tipo-beneficio/shared/tipo-beneficio.service';



@Component({
  selector: 'app-tipo-beneficio-lista',
  templateUrl: './tipo-beneficio-lista.component.html',
  styleUrls: ['./tipo-beneficio-lista.component.css']
})
export class TipoBeneficioListaComponent implements OnInit {
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
  public filtroDescricao: string = '';

  //variaveis de ordenação
  public key: string = 'descricao';
  public desc: boolean = false;

  //lista de tipoBeneficio
  public tipoBeneficio: TipoBeneficioModel[];

  public config = {
    id: 'custom',
    itemsPerPage: 10,
    currentPage: '1',
    totalItems: 27,
  };

  constructor(
    private setorService: TipoBeneficioService,
    private toastr: ToastrService,
    protected route: ActivatedRoute,
    protected router: Router,
    protected utilService: UtilService
  ) {}

  ngOnInit(): void {}

  public getTipoBeneficios() {
    this.utilService.showLoading();
    let params = new HttpParams();
    params = params.append('d', this.filtroDescricao);
    params = params.append('p', this.config.currentPage);

    this.setorService.getByFilter(params).subscribe(
      (retorno) => {
        if (retorno.data != null) {
          this.tipoBeneficio = retorno.data;
          this.config.totalItems = retorno.totalRegistro;
        } else if (retorno.status == 'NOK') {
          this.tipoBeneficio = [];
          this.toastr.error(retorno.mensagem);
        }

        this.utilService.showLoading(false);
      },
      (error) => this.errorMessage(error)
    );
  }

  public edit(tipoBeneficio): void {
    const baseComponentPath: string = this.route.snapshot.parent.url[0].path;

    //recarrega o componente com o recurso criado e permite edição
    this.router
      .navigateByUrl(baseComponentPath, { skipLocationChange: true })
      .then(() =>
        this.router.navigate([baseComponentPath, tipoBeneficio.id, 'alteracao'])
      );
  }

  public clear(): void {
    this.filtroDescricao = '';
    this.tipoBeneficio = undefined;
    this.config.totalItems = 0;
    this.config.currentPage = '1';
  }

  public new() {
    const baseComponentPath: string = this.route.snapshot.parent.url[0].path;
    //retorna para o componente de listagem
    this.router.navigate([baseComponentPath, 'novo']);
  }

  public search() {
    this.getTipoBeneficios();
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
    this.getTipoBeneficios();
  }

}
