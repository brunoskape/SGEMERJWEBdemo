import { HttpParams } from '@angular/common/http';
import { Component,  OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Console } from 'console';
import { IModalDialogSettings, ModalDialogService } from 'ngx-modal-dialog';
import { ToastrService } from 'ngx-toastr';
import { ModalConfirmComponent } from 'src/app/shared/components/modal-confirm/modal-confirm.component';
import { ModalListaComponent } from 'src/app/shared/components/modal-lista/modal-lista.component';
import { AutoContrasteService } from 'src/app/shared/directives/autocontraste.directive';
import { RetornoModel } from 'src/app/shared/models/retorno.model';
import { ComboService } from 'src/app/shared/services/combos.service';
import { UtilService } from 'src/app/shared/services/util.service';
import { TipoColaboradorModel } from '../../colaborador/shared/tipoColaborador.model';
import { EsocialComunicadorModel } from '../shared/esocial-comunicador.model';
import { EsocialComunicadorService } from '../shared/esocial-comunicador.service';
import { EsocialInconsistenciaModel } from '../shared/esocial-inconsistencia.model';
import { EsocialInconsistenciaService } from '../shared/esocial-inconsistencia.service';

@Component({
  selector: 'app-s2300-lista',
  templateUrl: './s2300-lista.component.html',
  styleUrls: ['./s2300-lista.component.css']
})
export class S2300ListaComponent implements OnInit {

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
 public filtroStatusEnvio: string = '0';
 public filtroTipoEvento: string = '0';

 //variaveis de ordenação
 public key: string = null;
 public desc: boolean = true;

 //lista de colabores e dropdown de tipos do filtro
 public eventos: EsocialComunicadorModel[];
 public nomeEvento: string;
 public listaTransmitir: any[] = [];
 public eventosMarcados: { [idDoTipo: number]: boolean } = {};
 public marcarTodos: boolean = false;
 public totalSelecionado: number[] = [];

 public tiposColaborador: TipoColaboradorModel[];
 public statusEnvio: any[] = [
  {id: 0, descricao: 'Todos'},
  {id: 1, descricao: 'Enviado'},
  {id: 2, descricao: 'Pendente'},
  {id: 3, descricao: 'Não Enviado'}
 ]

 public config = {
   id: 'custom',
   itemsPerPage: 10,
   currentPage: '1',
   totalItems: 27,
 };

  constructor(
    private esocialService: EsocialComunicadorService,
    private toastr: ToastrService,
    protected route: ActivatedRoute,
    protected router: Router,
    private utilService: UtilService,
    public comboService: ComboService,
    public modalService: ModalDialogService,
    public viewRef: ViewContainerRef,
    public autoContrasteService: AutoContrasteService,
    public esocialInconsistenciaService: EsocialInconsistenciaService
  ) { 
  }

  ngOnInit(): void {
    this.comboService.loadDropdownEventoEsocial()
  }

  public getEventos() {    
    this.nomeEvento = this.filtroTipoEvento;
    this.utilService.showLoading();
    let params = new HttpParams();
    params = params.append('cpf', this.filtroCpf);
    params = params.append('n', this.filtroNome);
    params = params.append('s', this.filtroStatusEnvio);
    params = params.append('e', this.nomeEvento);
    params = params.append('p', this.config.currentPage);

    this.esocialService.getByFilter(params).subscribe(
      (retorno) => {

        if (retorno.data != null) {
          this.eventos = retorno.data;
          this.config.totalItems = retorno.totalRegistro;
          this.carregarLista(retorno.data);
        } else if (retorno.status == 'NOK') {
          this.eventos = [];
          this.toastr.error(retorno.mensagem);
        }
        this.utilService.showLoading(false);
      },
      (error) => this.errorMessage(error)
    );
  }

  private carregarLista(dados){
    this.listaTransmitir = [];
    this.eventosMarcados = {};
    dados
    .filter( item => item.status != 'ENVIADO')
    .forEach((evento) => {
      this.listaTransmitir.push ({transmitir: false, id: evento.id})
        this.eventosMarcados[evento.id] = false;
    })
    this.verificaTotalMarcado();
  }

  public alterartransmissao(id, event){
    if(id == 0) {
      this.listaTransmitir.forEach((transmitir) => {
        transmitir.transmitir = event.target.checked;
        this.eventosMarcados[transmitir.id] = event.target.checked;
      })

    } else {

    this.marcarTodos = false;
    const objIndex = this.listaTransmitir.findIndex((obj => obj.id == id));
    
    this.listaTransmitir[objIndex].transmitir = !this.listaTransmitir[objIndex].transmitir;
    }
    this.verificaTotalMarcado();
  }
  private verificaTotalMarcado(){

    const transmitir = this.listaTransmitir.filter( item => item.transmitir == true);
    this.totalSelecionado = transmitir;
    if(transmitir.length == this.listaTransmitir.length && this.listaTransmitir.length != 0)
      this.marcarTodos = true;
    else
      this.marcarTodos = false;
  }

  public send() {
    this.utilService.showLoading();
    const selecionados: number[] = this.listaTransmitir.filter( elemento => elemento.transmitir == true ).map( x => x.id)

    this.esocialService.transmitirComunicadorMps(this.nomeEvento,selecionados).subscribe(
      (retorno) => this.actionsForSuccess(retorno),
      (error) => this.errorMessage(error)
    );
    
  }

  public search() {
    this.config.currentPage = '1';
    this.getEventos();
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
    this.key = null;
    this.marcarTodos = false;
    this.config.currentPage = event;
    this.getEventos();
  }


  protected actionsForSuccess(dadosEnviado: RetornoModel) {

    this.utilService.showLoading(false);
    
    if( dadosEnviado.status == 'NOK')
    {
      this.toastr.error(dadosEnviado.mensagem);
    } else {
      this.toastr.success(dadosEnviado.mensagem);
    }
    
    this.getEventos();
  }

  public clearGrid(){
    this.key = null;
    this.eventos = null;
    this.listaTransmitir = [];
    this.eventosMarcados = {};
    this.totalSelecionado = [];
  }
  public carregarRetornos(id:string){

    let inconsistencias: EsocialInconsistenciaModel[];
    let params = new HttpParams();

    this.utilService.showLoading();

    params = params.append('idComunicador', id);

    this.esocialInconsistenciaService.getByFilter(params).subscribe(
      (retorno) => {
        if (retorno.data != null) {
          inconsistencias = retorno.data;
          this.carregarDadosModal(inconsistencias);
        } else if (retorno.status == 'NOK') {
          inconsistencias = [];
          this.toastr.error(retorno.mensagem);
        }
        this.utilService.showLoading(false);
      },
      (error) => this.errorMessage(error)
    );

  }

  private carregarDadosModal(inconsistencias: EsocialInconsistenciaModel[]){
    
    this.utilService.showLoading(false);

    this.modalService.openDialog(this.viewRef, {
      title: 'Histórico de Retornos',
      childComponent: ModalListaComponent,
      data: {
        texto: 'Histórico de Retornos',
        eventos: inconsistencias
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
