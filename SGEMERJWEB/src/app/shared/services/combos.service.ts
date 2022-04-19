import { SituacaoService } from './situacao.service';
import { SituacaoModel } from './../models/situacao.model';
import { Injectable, Injector } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TipoColaboradorModel } from 'src/app/pages/colaborador/shared/tipoColaborador.model';
import { TipoColaboradorService } from 'src/app/pages/colaborador/shared/tipoColaborador.service';
import { SetorModel } from 'src/app/pages/setor/shared/setor.model';
import { SetorService } from 'src/app/pages/setor/shared/setor.service';
import { CadastramentoInicialModel } from '../models/cadastramento-inicial.model';
import { CBOCargoModel } from '../models/cbo-cargo.model';
import { ClassificacaoDeficienciasModel } from '../models/classificacao-deficiencias.model';
import { ClassTrabalhoEstrangeiroModel } from '../models/classTrabalhoEstrangeiro.model';
import { EsocialEventoModel } from '../models/esocial-evento.model';
import { EstadoCivilModel } from '../models/estadocivil.model';
import { GrauInstrucaoModel } from '../models/grauinstrucao.model';
import { MotivoAfastamentoModel } from '../models/motivo-afastamento.model';
import { MotivoRescisaoModel } from '../models/motivo-rescisao.model';
import { NaturezaEstagioModel } from '../models/natureza-estagio.model';
import { NivelEstagioModel } from '../models/nivel-estagio.model';
import { PaisModel } from '../models/pais.model';
import { RacaModel } from '../models/raca.model';
import { TempoResidenciaModel } from '../models/tempoResidencia.model';
import { TipoDependenteModel } from '../models/tipo-dependente.model';
import { TipoLogradouroModel } from '../models/tipoLogradouro.model';
import { UfModel } from '../models/uf.model';
import { UnidadePagamentoModel } from '../models/unidadePagamento.model';
import { CadastramentoInicialService } from './cadastramento-inicial.service';
import { CBOCargoService } from './cbo-cargo.service';
import { ClassificacaoDeficienciaService } from './classificacao-deficiencias.service';
import { ClassTrabalhoEstrangeiroService } from './classTrabalhoEstrangeiro.service';
import { EsocialEventoService } from './esocial-evento.service';
import { EstadoCivilService } from './estadocivil.service';
import { GrauInstrucaoService } from './grauinstrucao.service';
import { MotivoAfastamentoService } from './motivo-afastamento.service';
import { MotivoRescisaoService } from './motivo-rescisao.service';
import { NaturezaEstagioService } from './natureza-estagio.service';
import { NivelEstagioService } from './nivel-estagio.service';
import { PaisService } from './pais.service';
import { RacaService } from './raca.service';
import { TempoResidenciaService } from './tempoResidencia.service';
import { TipoDependenteService } from './tipo-dependente.service';
import { TipoLogradouroService } from './tipoLogradouro.service';
import { UfService } from './uf.service';
import { UnidadePagamentoService } from './unidadePagamento.service';

@Injectable({
  providedIn: 'root',
})
export class ComboService {
  //Variáveis de serviços
  private toastr: ToastrService;

  private ufService: UfService;
  private tipoLogradouroService: TipoLogradouroService;
  private tipoColaboradorService: TipoColaboradorService;
  private racaService: RacaService;
  private estadoCivilService: EstadoCivilService;
  private grauInstrucaoService: GrauInstrucaoService;
  private paisService: PaisService;
  private classificacaoDeficienciasService: ClassificacaoDeficienciaService;
  private unidadePagamentoService: UnidadePagamentoService;
  private tempoResidenciaService: TempoResidenciaService;
  private classTrabalhoEstrangeiroService: ClassTrabalhoEstrangeiroService;
  private tipoDependentesService: TipoDependenteService;
  private naturezaEstagioService: NaturezaEstagioService;
  private cboCargoService: CBOCargoService;
  private nivelEstagioService: NivelEstagioService;
  private setorService: SetorService;
  private motivoAfastamentoService: MotivoAfastamentoService;
  private cadastramentoInicialService: CadastramentoInicialService;
  private esocialEventoService: EsocialEventoService;
  private motivoRescisaoService: MotivoRescisaoService;
  private situacaoService: SituacaoService;

  //variaveis de array com elementos
  public ufs: UfModel[];
  public tiposLogradouro: TipoLogradouroModel[];
  public tiposColaborador: TipoColaboradorModel[];
  public racas: RacaModel[];
  public estadoCivil: EstadoCivilModel[];
  public grauInstrucao: GrauInstrucaoModel[];
  public paisesNascimento: PaisModel[];
  public paisesExterior: PaisModel[];
  public paisesNacionalidade: PaisModel[];
  public classificacaoDeficiencias: ClassificacaoDeficienciasModel[];
  public unidadePagamento: UnidadePagamentoModel[];
  public tempoResidencia: TempoResidenciaModel[];
  public classTrabalhoEstrangeiro: ClassTrabalhoEstrangeiroModel[];
  public tiposDependentes: TipoDependenteModel[];
  public naturezaEstagio: NaturezaEstagioModel[];
  public cboCargo: CBOCargoModel[];
  public nivelEstagio: NivelEstagioModel[];
  public setorEstagio: SetorModel[];
  public motivoAfastamento: MotivoAfastamentoModel[];
  public cadastramentoInicial: CadastramentoInicialModel[];
  public esocialEvento: EsocialEventoModel[];
  public motivoRescisao: MotivoRescisaoModel[];
  public situacao: SituacaoModel[];

  constructor(protected injector: Injector) {

    this.toastr = injector.get(ToastrService);

    this.ufService = injector.get(UfService);
    this.tipoLogradouroService = injector.get(TipoLogradouroService);
    this.tipoColaboradorService = injector.get(TipoColaboradorService);
    this.racaService = injector.get(RacaService);
    this.estadoCivilService = injector.get(EstadoCivilService);
    this.grauInstrucaoService = injector.get(GrauInstrucaoService);
    this.paisService = injector.get(PaisService);
    this.classificacaoDeficienciasService = injector.get(
      ClassificacaoDeficienciaService
    );
    this.unidadePagamentoService = injector.get(UnidadePagamentoService);
    this.tempoResidenciaService = injector.get(TempoResidenciaService);
    this.classTrabalhoEstrangeiroService = injector.get(
      ClassTrabalhoEstrangeiroService
    );
    this.tipoDependentesService = injector.get(TipoDependenteService);
    this.naturezaEstagioService = injector.get(NaturezaEstagioService);
    this.cboCargoService = injector.get(CBOCargoService);
    this.nivelEstagioService = injector.get(NivelEstagioService);
    this.setorService = injector.get(SetorService);
    this.motivoAfastamentoService = injector.get(MotivoAfastamentoService);
    this.cadastramentoInicialService = injector.get(
      CadastramentoInicialService
    );
    this.esocialEventoService = injector.get(EsocialEventoService);
    this.motivoRescisaoService = injector.get(MotivoRescisaoService);
    this.situacaoService = injector.get(SituacaoService);

    this.loadDropdownTipoColaborador();

    this.loadDropdownUf();
    this.loadDropdownTipoLogradouro();
    this.loadDropdownRaca();
    this.loadDropdownEstadoCivil();
    this.loadDropdownGrauInstrucao();
    this.loadDropdownPaisNascimento();
    this.loadDropdownClassificacaoDeficiencias();
    this.obterUnidadePagamento();
    this.obterTempoResidencia();
    this.obterClassTrabEstrangeiro();
    this.loadDropdownTiposDependentes();
    this.loadDropdownNaturezaEstagio();
    this.loadDropdownCBOCargo();
    this.loadDropdownNivelEstagio();
    this.loadDropdownSetoresAtivos();
    this.loadDropdownMotivoAfastamento();
    this.loadDropdownCadastramentoInicial();
    this.loadDropdownPaisNacionalidade();
    this.loadDropdownEventoEsocial();
    this.loadDropdownMotivoRescisao();
    this.loadDropdownSituacao();
  }

  public loadDropdownUf() {
    this.ufService.getAll().subscribe(
      (retorno) => {
        if (retorno.data != null) {
          this.ufs = retorno.data;
          this.ufs.unshift({ id: 0, descricao: 'Selecione' });
        } else if (retorno.status == 'NOK') {
          this.ufs = [];
          this.toastr.error(retorno.mensagem);
        }
      },
      (error) => {}
    );
  }

  public loadDropdownTipoLogradouro() {
    this.tipoLogradouroService.getAll().subscribe(
      (retorno) => {
        if (retorno.data != null) {
          this.tiposLogradouro = retorno.data;
        } else if (retorno.status == 'NOK') {
          this.tiposLogradouro = [];
          this.toastr.error(retorno.mensagem);
        }
      },
      (error) => {}
    );
  }

  public loadDropdownTipoColaborador() {
    this.tipoColaboradorService.getAll().subscribe(
      (retorno) => {
        if (retorno.data != null) {
          this.tiposColaborador = retorno.data;
          this.tiposColaborador.unshift({ id: 0, descricao: 'Selecione' });
        } else if (retorno.status == 'NOK') {
          this.tiposColaborador = [];
          this.toastr.error(retorno.mensagem);
        }
      },
      (error) => {}
    );
  }

  public loadDropdownRaca() {
    this.racaService.getAll().subscribe(
      (retorno) => {
        if (retorno.data != null) {
          this.racas = retorno.data;
          this.racas.unshift({ id: 0, descricao: 'Selecione' });
        } else if (retorno.status == 'NOK') {
          this.racas = [];
          this.toastr.error(retorno.mensagem);
        }
      },
      (error) => {}
    );
  }

  public loadDropdownEstadoCivil() {
    this.estadoCivilService.getAll().subscribe(
      (retorno) => {
        if (retorno.data != null) {
          this.estadoCivil = retorno.data;
          this.estadoCivil.unshift({ id: 0, descricao: 'Selecione' });
        } else if (retorno.status == 'NOK') {
          this.estadoCivil = [];
          this.toastr.error(retorno.mensagem);
        }
      },
      (error) => {}
    );
  }

  public loadDropdownGrauInstrucao() {
    this.grauInstrucaoService.getAll().subscribe(
      (retorno) => {
        if (retorno.data != null) {
          this.grauInstrucao = retorno.data;
          this.grauInstrucao.unshift({ id: 0, descricao: 'Selecione' });
        } else if (retorno.status == 'NOK') {
          this.grauInstrucao = [];
          this.toastr.error(retorno.mensagem);
        }
      },
      (error) => {}
    );
  }

  public loadDropdownPaisNascimento() {
    this.paisService.getAll().subscribe(
      (retorno) => {
        if (retorno.data != null) {
          const paises = retorno.data;

          paises.unshift({ id: 0, descricao: 'Selecione' });
          this.paisesNascimento = paises;
          this.paisesExterior = paises.filter((x: PaisModel) => x.id != 1);
        } else if (retorno.status == 'NOK') {
          this.paisesNascimento = [];
          this.toastr.error(retorno.mensagem);
        }
      },
      (error) => {}
    );
  }

  public loadDropdownPaisNacionalidade() {
    this.paisService.getAll().subscribe(
      (retorno) => {
        if (retorno.data != null) {
          this.paisesNacionalidade = retorno.data;
          this.paisesNacionalidade.unshift({
            id: 0,
            descricao: 'Selecione',
          });
        } else if (retorno.status == 'NOK') {
          this.paisesNacionalidade = [];
          this.toastr.error(retorno.mensagem);
        }
      },
      (error) => {}
    );
  }

  public loadDropdownClassificacaoDeficiencias() {
    this.classificacaoDeficienciasService.getAll().subscribe(
      (retorno) => {
        if (retorno.data != null) {
          this.classificacaoDeficiencias = retorno.data;
        } else if (retorno.status == 'NOK') {
          this.classificacaoDeficiencias = [];
          this.toastr.error(retorno.mensagem);
        }
      },
      (error) => {}
    );
  }

  public obterUnidadePagamento() {
    this.unidadePagamentoService.getAll().subscribe(
      (retorno) => {
        if (retorno.data != null) {
          this.unidadePagamento = retorno.data;
          this.unidadePagamento.unshift({ id: 0, descricao: 'Selecione' });
        } else if (retorno.status == 'NOK') {
          this.unidadePagamento = [];
          this.toastr.error(retorno.mensagem);
        }
      },
      (error) => {}
    );
  }

  public obterTempoResidencia() {
    this.tempoResidenciaService.getAll().subscribe(
      (retorno) => {
        if (retorno.data != null) {
          this.tempoResidencia = retorno.data;
        } else if (retorno.status == 'NOK') {
          this.tempoResidencia = [];
          this.toastr.error(retorno.mensagem);
        }
      },
      (error) => {}
    );
  }

  public obterClassTrabEstrangeiro() {
    this.classTrabalhoEstrangeiroService.getAll().subscribe(
      (retorno) => {
        if (retorno.data != null) {
          this.classTrabalhoEstrangeiro = retorno.data;
        } else if (retorno.status == 'NOK') {
          this.classTrabalhoEstrangeiro = [];
          this.toastr.error(retorno.mensagem);
        }
      },
      (error) => {}
    );
  }

  public loadDropdownTiposDependentes() {
    this.tipoDependentesService.getAll().subscribe(
      (retorno) => {
        if (retorno.data != null) {
          this.tiposDependentes = retorno.data;
          this.tiposDependentes.unshift({ id: 0, descricao: 'Selecione' });
        } else if (retorno.status == 'NOK') {
          this.tiposDependentes = [];
          this.toastr.error(retorno.mensagem);
        }
      },
      (error) => {}
    );
  }

  public loadDropdownNaturezaEstagio() {
    this.naturezaEstagioService.getAll().subscribe(
      (retorno) => {
        if (retorno.data != null) {
          this.naturezaEstagio = retorno.data;
          this.naturezaEstagio.unshift({ id: 0, descricao: 'Selecione' });
        } else if (retorno.status == 'NOK') {
          this.naturezaEstagio = [];
          this.toastr.error(retorno.mensagem);
        }
      },
      (error) => {}
    );
  }

  public loadDropdownCBOCargo() {
    this.cboCargoService.getAll().subscribe(
      (retorno) => {
        if (retorno.data != null) {
          this.cboCargo = retorno.data;
          const selecione = new CBOCargoModel();
          selecione.id = 0;
          selecione.descricao = 'Selecione';
          this.cboCargo.unshift(selecione);

        } else if (retorno.status == 'NOK') {
          this.cboCargo = [];
          this.toastr.error(retorno.mensagem);
        }
      },
      (error) => {}
    );
  }

  public loadDropdownNivelEstagio() {
    this.nivelEstagioService.getAll().subscribe(
      (retorno) => {
        if (retorno.data != null) {
          this.nivelEstagio = retorno.data;
          this.nivelEstagio.unshift({ id: 0, descricao: 'Selecione' });
        } else if (retorno.status == 'NOK') {
          this.nivelEstagio = [];
          this.toastr.error(retorno.mensagem);
        }
      },
      (error) => {}
    );
  }

  public loadDropdownSetoresAtivos() {
    this.setorService.getSetoresAtivo().subscribe(
      (retorno) => {
        if (retorno.data != null) {
          this.setorEstagio = retorno.data;
          const selecione = new SetorModel();
          selecione.id = 0;
          selecione.descricao = 'Selecione';
          this.setorEstagio.unshift(selecione);
        } else if (retorno.status == 'NOK') {
          this.setorEstagio = [];
          this.toastr.error(retorno.mensagem);
        }
      },
      (error) => {}
    );
  }

  public loadDropdownMotivoAfastamento() {
    this.motivoAfastamentoService.getAll().subscribe(
      (retorno) => {
        if (retorno.data != null) {
          this.motivoAfastamento = retorno.data;
          const selecione = new MotivoAfastamentoModel();
          selecione.id = 0;
          selecione.descricao = 'Selecione';
          this.motivoAfastamento.unshift(selecione);
        } else if (retorno.status == 'NOK') {
          this.motivoAfastamento = [];
          this.toastr.error(retorno.mensagem);
        }
      },
      (error) => {}
    );
  }

  public loadDropdownCadastramentoInicial() {
    this.cadastramentoInicialService.getAll().subscribe(
      (retorno) => {
        if (retorno.data != null) {
          this.cadastramentoInicial = retorno.data;
          const selecione = new CadastramentoInicialModel();
          selecione.id = 0;
          selecione.descricao = 'Selecione';
          this.cadastramentoInicial.unshift(selecione);
        } else if (retorno.status == 'NOK') {
          this.cadastramentoInicial = [];
          this.toastr.error(retorno.mensagem);
        }
      },
      (error) => {}
    );
  }

    public loadDropdownEventoEsocial() {
    this.esocialEventoService.getAll().subscribe(
      (retorno) => {
        if (retorno.data != null) {
          this.esocialEvento = retorno.data;
          this.esocialEvento.unshift({ id: 0, descricao: 'Selecione' });
        } else if (retorno.status == 'NOK') {
          this.esocialEvento = [];
          this.toastr.error(retorno.mensagem);
        }
      },
      (error) => {}
    );
  }

  public loadDropdownMotivoRescisao() {
    this.motivoRescisaoService.getAll().subscribe(
      (retorno) => {
        if (retorno.data != null) {
          this.motivoRescisao = retorno.data;
          const selecione = new MotivoRescisaoModel();
          selecione.id = 0;
          selecione.descricao = 'Selecione';
          this.motivoRescisao.unshift(selecione);
        } else if (retorno.status == 'NOK') {
          this.motivoRescisao = [];
          this.toastr.error(retorno.mensagem);
        }
      },
      (error) => {}
    );
  }

  public loadDropdownSituacao() {
    this.situacaoService.getAll().subscribe(
      (retorno) => {
        if (retorno.data != null) {
          this.situacao = retorno.data;
          this.situacao.unshift({ id: 0, descricao: 'Selecione' });
        } else if (retorno.status === 'NOK') {
          this.situacao = [];
          this.toastr.error(retorno.mensagem);
        }
      },
      (error) => {}
    );
  }
}
