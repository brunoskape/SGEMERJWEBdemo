import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IModalDialogSettings, ModalDialogService } from 'ngx-modal-dialog';
import { ToastrService } from 'ngx-toastr';
import { AutoContrasteService } from 'src/app/shared/directives/autocontraste.directive';
import { ComboService } from 'src/app/shared/services/combos.service';
import { UtilService } from 'src/app/shared/services/util.service';
import { ModalListaErrosComponent } from '../modal-lista-erros/modal-lista-erros.component';
import { ErrosEsocialModel } from '../shared/erros-esocial.model';
import { ErrosEsocialService } from '../shared/erros-esocial.service]';
import { EsocialDadosRelatorioModel } from '../shared/esocial-dados-relatorio.model';
import { EsocialDadosRelatorioService } from '../shared/esocial-dados-relatorio.service';

@Component({
  selector: 'app-esocial-relatorio',
  templateUrl: './esocial-relatorio.component.html',
  styleUrls: ['./esocial-relatorio.component.css']
})
export class EsocialRelatorioComponent implements OnInit {
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
   public filtroTipoEvento: string = '0';
   public filtroStatusEnvio: string = '0';
   public filtroReferencia: string = '';
   public filtroNome: string = '';
   public filtroCpf: string = '';

 
   //variaveis de ordenação
   public key: string = 'colaborador.cpf';
   public desc: boolean = false;
 
   //lista de setores
   public acompanhamentos: EsocialDadosRelatorioModel[];
 
   public config = {
     id: 'custom',
     itemsPerPage: 10,
     currentPage: '1',
     totalItems: 27,
   };


  public statusEnvio: any[] = [
    {id: 0, descricao: 'Todos'},
    {id: 1, descricao: 'Aceito'},
    {id: 2, descricao: 'Recusado'}
   ];

  constructor(
    public comboService: ComboService,
    private acompanhamentoService: EsocialDadosRelatorioService,
    private toastr: ToastrService,
    protected route: ActivatedRoute,
    protected router: Router,
    protected utilService: UtilService,
    public errosEsocialService: ErrosEsocialService,
    public modalService: ModalDialogService,
    public viewRef: ViewContainerRef,
    public autoContrasteService: AutoContrasteService,
  ) { }

  ngOnInit(): void {
    this.comboService.loadDropdownEventoEsocial();
  }

  public search() {
    if(this.validarFiltro())
    {
    this.getAcompanhamento('true');
    this.config.currentPage = '1';
    }
  }

  public validarFiltro(): boolean {
    if(this.filtroTipoEvento == "0" || this.filtroReferencia == '' || this.filtroReferencia.length < 6 ) {
      this.toastr.warning("evento e competência devem ser informado");
      return false;
    }

    return true;
  }

  public getAcompanhamento(importar:string) {
    this.utilService.showLoading();
    let params = new HttpParams();
    params = params.append('evento', this.filtroTipoEvento.toString());
    params = params.append('referencia', this.filtroReferencia);
    params = params.append('status', this.filtroStatusEnvio);
    params = params.append('nome', this.filtroNome);
    params = params.append('cpf', this.filtroCpf);
    params = params.append('import', importar);
    params = params.append('pagina', this.config.currentPage);

    this.acompanhamentoService.getByFilter(params).subscribe(
      (retorno) => {
        if (retorno.data != null) {
;
          this.acompanhamentos = retorno.data;
          this.config.totalItems = retorno.totalRegistro;
        } else if (retorno.status == 'NOK') {
          this.acompanhamentos = [];
          this.toastr.error(retorno.mensagem);
        }

        this.utilService.showLoading(false);
      },
      (error) => this.errorMessage(error)
    );
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
    this.getAcompanhamento('false');
  }

  public carregarRetornos(id:string){

    this.utilService.showLoading();


    this.errosEsocialService.obterPorIdentificadorMPS(id).subscribe(
      (retorno) => {
        if (retorno.data != null) {
          this.carregarDadosModal( retorno.data);
        } else if (retorno.status == 'NOK') {
          this.toastr.error(retorno.mensagem);
        }
        this.utilService.showLoading(false);
      },
      (error) => this.errorMessage(error)
    );

  }

  
  private carregarDadosModal(errosEsocial: ErrosEsocialModel[]){
    
    this.utilService.showLoading(false);

    this.modalService.openDialog(this.viewRef, {
      title: 'Histórico de Retornos',
      childComponent: ModalListaErrosComponent,
      data: {
        texto: 'Histórico de Retornos',
        eventos: errosEsocial
      },

      settings: this.settingsModalTrataContraste,

      actionButtons: [

        {
          text: 'Fechar',
          buttonClass: this.classeBotaNaoModalTrataContraste,
          onAction: () => {
            return true;
          },
        }
      ],
    });
  }


  
  get classeBotaSimModalTrataContraste(): string {
    if (this.autoContrasteService.exibeAutoContraste)
      return 'auto-contraste-modal-Sim';
    else return 'btn btn-danger';
  }

  get classeBotaNaoModalTrataContraste(): string {
    if (this.autoContrasteService.exibeAutoContraste)
      return 'auto-contraste-modal-Nao';
    else return 'btn btn-light';
  }

  get settingsModalTrataContraste():Partial<IModalDialogSettings>{
    let settings:Partial<IModalDialogSettings> =  {};
    if (this.autoContrasteService.exibeAutoContraste) {
      settings = {
        modalDialogClass: 'modal-dialog modal-dialog-centered modal-xl',
        headerClass: 'modal-header auto-contraste-modal',
        bodyClass: 'modal-body auto-contraste-modal',
        footerClass: 'modal-footer auto-contraste-modal',
        contentClass: 'modal-content auto-contraste-modal-content-remove-clip'
      };
    }

    settings = {
      modalDialogClass: 'modal-dialog modal-dialog-centered modal-xl'
    }

    return settings;
  }
}
