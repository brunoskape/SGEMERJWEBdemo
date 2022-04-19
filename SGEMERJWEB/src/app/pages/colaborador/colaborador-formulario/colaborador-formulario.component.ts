import { InformacoesAcademicaModel } from '../../../shared/models/informacoes-academica.model';
import { Component, ElementRef, Injector, ViewChild } from '@angular/core';
import { FormArray, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { BaseFormComponent } from 'src/app/shared/components/base-form/base-form.component';
import { ModalConfirmComponent } from 'src/app/shared/components/modal-confirm/modal-confirm.component';
import { AfastamentoModel } from 'src/app/shared/models/afastamento.model';
import { DependenteModel } from 'src/app/shared/models/dependente.model';
import { EnderecoModel } from 'src/app/shared/models/endereco.model';
import { ExperienciaProfissionalModel } from 'src/app/shared/models/experiencia-profissional.model';
import { MotivoAfastamentoModel } from 'src/app/shared/models/motivo-afastamento.model';
import { CepService } from 'src/app/shared/services/cep.service';
import { ComboService } from 'src/app/shared/services/combos.service';
import { Validadores } from 'src/app/shared/validator/custom.validator';
import { EsocialComunicadorService } from '../../esocial/shared/esocial-comunicador.service';
import { ModalColaboradorComponent } from '../colaborador-modal/colaborador-modal.component';
import { ColaboradorModel } from '../shared/colaborador.model';
import { ColaboradorService } from '../shared/colaborador.service';
import { CadastramentoInicialModel } from './../../../shared/models/cadastramento-inicial.model';
import { CursoExtraCurricularModel } from './../../../shared/models/curso-extra-curricular.model';
import { ValidadoresColaborador } from './../shared/validator/custom.validator';

@Component({
  selector: 'app-colaborador-formulario',
  templateUrl: './colaborador-formulario.component.html',
  styleUrls: ['./colaborador-formulario.component.css'],
})
export class ColaboradorFormularioComponent extends BaseFormComponent<ColaboradorModel> {
  //lista de colabores
  public colaborador: ColaboradorModel;
  public deficienciasMarcadas: { [id: number]: string } = {};
  public salBase: string = '';
  public dependentes: DependenteModel[] = [];
  public modelFormDependente: FormGroup;
  public sexo: any[] = [
    { id: '', descricao: 'Selecione' },
    { id: 'F', descricao: 'Feminino' },
    { id: 'M', descricao: 'Masculino' },
  ];

  public abasInvalidas: { [group: string]: boolean } = {
    ['1']: false,
    ['2']: false,
  };

  desabilitaCampos: boolean;

  //início afastamento
  public afastamentos: AfastamentoModel[] = [];
  public modelFormAfastamento: FormGroup;
  //fim afastamento

  //início curso extra curriculares
  public cursosExtraCurriculares: CursoExtraCurricularModel[] = [];
  public modelFormCursoExtraCurriculares: FormGroup;
  //fim curso extra curriculares

  //início TSVE
  public cadastramentoInicial: CadastramentoInicialModel[] = [];
  //fim TSVE

  //início Experiencias anteriores
  public experiencias: ExperienciaProfissionalModel[] = [];
  public modelFormExperiencias: FormGroup;
  //fim Experiencias anteriore

  //campos de consulta inicial
  public nome: string = '';
  public cpf: string = '';
  public filtroTipoColaborador: number = 0;

  //campos do arquivo
  //imgFile: string;
  public buscouColaborador = false;

  public informacoesAcademica: InformacoesAcademicaModel[] = [];
  public modelFormInformacoesAcademica: FormGroup;

  isRegister = false;

  @ViewChild('photoFile')
  public photoFile: ElementRef;

  constructor(
    protected colaboradorService: ColaboradorService,
    protected cepService: CepService,
    protected injector: Injector,
    protected toastr: ToastrService,
    public comboService: ComboService,
    protected esocialService: EsocialComunicadorService
  ) {
    super(
      injector,
      new ColaboradorModel(),
      colaboradorService,
      ColaboradorModel.fromJson,
      toastr
    );
  }
  protected loadDataAfterBuildForm(): void {
    this.carregarDadosDeficiencia();
    this.carregarDadosDependente();
    this.desabilitarCampos();
    this.carregarDadosAfastamento();
    this.carregarDadosCursoExtraCurriculares();
    this.carregarDadosExperienciaAnterior();
    this.carregarDadosInformacoesAcademica();

    this.removerCamposComBaseNoTipo();
  }

  private removerCamposComBaseNoTipo() {
    const tipo = this.modelForm.get('tipoColaborador').get('id');

    if (tipo.value == 2 || tipo.value == 3) {
      //quando for prestador
      this.modelForm.removeControl('dadoEstagio');
    } else if (tipo.value == 1) {
      //quando for estagiário
      this.modelForm.removeControl('salarioBase');
      this.modelForm.removeControl('observacaoRemuneracao');
      this.modelForm.removeControl('unidadePagamento');
    }
  }

  desabilitarCampos() {
    if (this.modelForm.value.idDoTipo > 0) {
      this.buscouColaborador = true;
    }
  }

  carregarDadosDependente() {
    this.model.dependentes.forEach((x) => {
      x.id = this.getRandomId();
      this.dependentes.push(x);
    });
  }

  carregarDadosAfastamento() {
    this.model.afastamentos.forEach((x) => {
      x.id = this.getRandomId();
      x.motivoAfastamento = MotivoAfastamentoModel.fromJson(
        x.motivoAfastamento
      );
      this.afastamentos.push(x);
    });

    this.afastamentos = this.ordenarAfastamentos(this.afastamentos);
  }

  carregarDadosCursoExtraCurriculares() {
    this.model.cursosExtraCurriculares.forEach((x) => {
      x.id = this.getRandomId();
      this.cursosExtraCurriculares.push(x);
    });
  }

  carregarDadosDeficiencia() {
    this.comboService.classificacaoDeficiencias.forEach((x) => {
      this.deficienciasMarcadas[x.id] = null;
    });

    let controlArray = <FormArray>(
      this.modelForm.get('deficiencia').get('classificacaoDeficiencias')
    );
    this.model.deficiencia.classificacaoDeficiencias.forEach((x) => {
      this.deficienciasMarcadas[x.id] = 'true';
      let objeto = { id: x.id };
      controlArray.push(this.formBuilder.group(objeto));
    });
  }

  carregarDadosExperienciaAnterior() {
    this.model.experienciasProfissional.forEach((x) => {
      x.id = this.getRandomId();
      this.experiencias.push(x);
    });
    this.experiencias = this.ordenarExperiencias(this.experiencias);
  }

  carregarDadosInformacoesAcademica() {
    this.model.informacoesAcademica.forEach((x) => {
      x.id = this.getRandomId();
      this.informacoesAcademica.push(x);
    });
  }

  protected buildForm() {
    this.modelForm = this.formBuilder.group(
      {
        id: [null],
        idDoTipo: [null],
        nome: [null, [Validators.required]],
        protocolo: [null],
        cpfNovo: [null],
        cpf: [null, [Validators.required, Validadores.cpf()]],
        rg: [null ],
        nomeSocial: [null],
        ativo: [true],
        nascimento: [
          null,
          [Validators.required, ValidadoresColaborador.nascimentoColaborador()],
        ],
        sexo: ['', [Validators.required]],
        tipoColaborador: this.formBuilder.group({
          id: [0, [Validadores.comboSelecione()]],
        }),
        raca: this.formBuilder.group({
          id: [0, [Validadores.comboSelecione()]],
        }),
        estadoCivil: this.formBuilder.group({
          id: [0, [Validadores.comboSelecione()]],
        }),
        grauInstrucao: this.formBuilder.group({
          id: [0, [Validadores.comboSelecione()]],
        }),
        paisNascimento: this.formBuilder.group({
          id: [0, [Validadores.comboSelecione()]],
        }),
        paisNacionalidade: this.formBuilder.group({
          id: [0, [Validadores.comboSelecione()]],
        }),
        fotoBase64: [null],
        idGed: [null],
        deficiencia: this.formBuilder.group({
          id: [],
          ehPortadorDeNecessidadeEspecial: [false],
          ehReabilitadoReadaptado: [false],
          observacaoDeficiencia: [''],
          classificacaoDeficiencias: this.formBuilder.array([
            // this.formBuilder.group({id:[]})
          ]),
        }),
        emails: this.formBuilder.array([
          this.formBuilder.group({
            email: [null, [Validators.email]],
            tipoContato: [1],
            id: [],
          }),
          this.formBuilder.group({
            email: [null, [Validators.email]],
            tipoContato: [2],
            id: [],
          }),
        ]),
        telefones: this.formBuilder.array([
          this.formBuilder.group({
            ddd: ['', [Validadores.tamanhoMinimo(2)]],
            numero: ['', [Validadores.tamanhoMinimo(8)]],
            tipoContato: [1],
            id: [],
          }),
          this.formBuilder.group({
            ddd: ['', [Validadores.tamanhoMinimo(2)]],
            numero: ['', [Validadores.tamanhoMinimo(8)]],
            tipoContato: [2],
            id: [],
          }),
        ]),
        cpfAntigo: [null],
        dataAlteracaoCPF: [null],
        observacaoAlteracaoCPF: [null],
        horarioInicioTrabalho: [null],
        horarioTerminoTrabalho: [null],
        eHorarioDinamicoTrabalho: [false],
        enderecos: this.formBuilder.array([
          this.formBuilder.group({
            cep: [],
            nomeLogradouro: [],
            numeroLogradouro: [],
            complemento: [],
            bairro: [],
            municipio: [],
            tipo: [],
            uf: this.formBuilder.group({
              id: ['RJ'],
            }),
            tipoLogradouro: this.formBuilder.group({
              id: [0],
            }),
          }),
        ]),
        salarioBase: [
          null,
          [Validators.required, Validadores.tamanhoMaximo(10)],
        ],
        observacaoRemuneracao: [null, Validadores.tamanhoMaximo(200)],
        unidadePagamento: this.formBuilder.group({
          id: [0, [Validadores.comboSelecione()]],
        }),
        tempoResidenciaEstrangeiro: this.formBuilder.group({
          id: [0],
        }),
        classificacaoTrabEstrangeiro: this.formBuilder.group({
          id: [0],
        }),
        residenciaExterior: this.formBuilder.group({
          paisResidencia: this.formBuilder.group({
            id: [0],
          }),
          codigoPostal: [null],
          descricao: [null],
          numero: [null],
          complemento: [null],
          bairro: [null],
          cidade: [null],
        }),

        dadoTSVE: this.formBuilder.group({
          cadastramentoInicial: this.formBuilder.group({
            id: [0, [Validadores.comboSelecione()]],
          }),
          matricula: [null, [Validators.required]],
          dataInicio: [null, [Validators.required, Validadores.data()]],
          numeroProcesso: [null,[Validators.minLength(20), Validators.maxLength(20)]],
          cargo: [null, [ Validators.maxLength(100)]],
          cboCargo: this.formBuilder.group({
            id: [0, []],
          }),
        }),

        dependentes: this.formBuilder.array([this.formBuilder.group({})]),
        informacoesAcademica: this.formBuilder.array([this.formBuilder.group({})]),
        dadoEstagio: this.formBuilder.group(
          {
            naturezaEstagio: this.formBuilder.group({
              id: [0, [Validadores.comboSelecione()]],
            }),
            nivelEstagio: this.formBuilder.group({
              id: [0, [Validadores.comboSelecione()]],
            }),
            setorEstagio: this.formBuilder.group({
              id: [0, [Validadores.comboSelecione()]],
            }),
            apoliceSeguro: [null],
            areaAtuacao: [
              null,
              [Validators.required, Validators.maxLength(60)],
            ],
            dataInicio: [null, [Validators.required, Validadores.data()]],
            dataPrevistaTermino: [
              null,
              [Validators.required, Validadores.data()],
            ],
            horarioInicio: [null, Validators.required],
            horarioTermino: [null, Validators.required],
            eHorarioDinamico:[false],
            cpfSupervisor: [null, [Validators.required, Validadores.cpf()]],
            nomeSupervisor: [
              null,
              [Validators.required, Validators.maxLength(100)],
            ],
            cnpjInstEnsino: [null, [Validadores.cnpj()]],
            razaoSocialInstEnsino: [null],
            enderecoInstEnsino: this.formBuilder.group({
              cep: [null],
              tipoLogradouro: this.formBuilder.group({
                id: [null],
              }),
              nomeLogradouro: [null],
              numeroLogradouro: [null],
              complemento: [null],
              bairro: [null],
              municipio: [null],
              uf: this.formBuilder.group({
                id: [null],
              }),
              tipo: [1],
              id: [0],
            }),
            cnpjAgenteInt: [null, [Validadores.cnpj()]],
            razaoSocialAgenteInt: [null],
            id: [0],
          },
          {
            validators: [
              ValidadoresColaborador.horarioEstagio(),
              ValidadoresColaborador.datasEstagio(),
              ValidadoresColaborador.dadosInstituicaoEnsino(),
              ValidadoresColaborador.infoEstagioHoraDinamica()
            ],
          }
        ),
      },
      {
        validators: [
          ValidadoresColaborador.dadosTSVEDataInicio(),
          ValidadoresColaborador.dadosTrabalhadorEstrangeiro(),
          ValidadoresColaborador.dadosDeficiencia(),
          ValidadoresColaborador.dadosEnderecoExterior(),
          ValidadoresColaborador.dadosEnderecoExteriorValida(),
          ValidadoresColaborador.dadosTSVECargoFuncao()
        ],
      }
    );

    this.modelFormDependente = this.formBuilder.group(
      {
        tipoDependente: this.formBuilder.group({
          id: [0, Validadores.comboSelecione()],
          descricao: [null],
        }),
        nome: [null, [Validators.required]],
        nascimento: [
          null,
          [Validators.required, ValidadoresColaborador.nascimentoDependente()],
        ],
        cpf: [null],
        temIRRF: [false],
        temSalarioFamilia: [false],
        temIncapacidadeFisicaMental: [false],
        idDependenteAux: [0],
        id: [0],
      },
      {
        validators: ValidadoresColaborador.cpfDependente(),
      }
    );

    this.modelFormAfastamento = this.formBuilder.group(
      {
        motivoAfastamento: this.formBuilder.group({
          id: [0, Validadores.comboSelecione()],
        }),
        dataInicio: [null, [Validators.required, Validadores.data()]],
        dataTermino: [null, [Validadores.data()]],
        observacaoAfastamento: [null],
        id: [0],
      },
      {
        validators: ValidadoresColaborador.datasAfastamento(),
      }
    );

    this.modelFormCursoExtraCurriculares = this.formBuilder.group({
      descricao: [null, [Validators.required]],
      id: [0],
    });

    this.modelFormExperiencias = this.formBuilder.group({
      ano: [null],
      empresa: [null, [Validators.required]],
      cargoOcupado: [null, [Validators.required]],
      dataInicioPeriodo: [null, [Validators.required, Validadores.MesAno()]],
      dataFimPeriodo: [null, [Validadores.MesAno()]],
      id: [0],
    });


    this.modelFormInformacoesAcademica = this.formBuilder.group(
      {
        curso: [null],
        situacao: this.formBuilder.group({
          id: [0, Validadores.comboSelecione()],
          descricao: [null],
        }),
        previsaoConclusao: [null],
        id: [0],
      }
    );
  }

  get imgFile(): string {
    const base64 = this.modelForm.value.fotoBase64;
    return base64;
  }

  public solicitarConfirmacaoDeAcao(acao: number, tipo: string, nome: string) {
    let mensagem = '';
    nome = nome.toUpperCase();
    tipo = tipo.toUpperCase();
    if (acao == 1) {
      //colaborador existe e tipo não existe
      mensagem +=
        'INCLUSÃO do tipo ' + tipo + ' para o colaborador ' + nome + '.';
      mensagem += '<br><br>';
      mensagem +=
        'Foram carregados os DADOS DO COLABORADOR, ENDEREÇO, CONTATO e TRABALHADOR ESTRANGEIRO já existentes.';
    } else if (acao == 2) {
      //colaborador existe e tipo não existe
      mensagem +=
        'ALTERAÇÃO do colaborador ' + nome + ' com o tipo ' + tipo + '.';
    }
    mensagem += '<br><br>';
    mensagem += 'Deseja continuar? ';

    this.showLoading(false);

    this.modalService.openDialog(this.viewRef, {
      title: 'Confirmação',
      childComponent: ModalConfirmComponent,
      data: {
        texto: mensagem,
      },

      settings: this.settingsModalTrataContraste,

      actionButtons: [
        {
          text: 'Sim',
          buttonClass: this.classeBotaSimModalTrataContraste,
          onAction: () => {
            if (acao == 2) this.redirectToEdit(this.colaborador.idDoTipo);

            return true;
          },
        },
        {
          text: 'Não',
          buttonClass: this.classeBotaNaoModalTrataContraste,
          onAction: () => {
            this.clear();
            return true;
          },
        },
      ],
    });
  }

  public getColaborador() {
    this.showLoading();

    this.limparAbasInvalidas();

    const cpf = this.modelForm.get('cpf');
    const tipo = this.modelForm.get('tipoColaborador').get('id');

    if (cpf.invalid || tipo.invalid) {
      cpf.markAsTouched();
      tipo.markAllAsTouched();
      this.toastr.error('Favor informar o tipo e um CPF válido');
      this.showLoading(false);
    } else {
      this.colaboradorService.obterPorTipoECpf(tipo.value, cpf.value).subscribe(
        (retorno) => {
          this.buscouColaborador = true;
          const descricaoDoTipo = this.comboService.tiposColaborador.find(
            (x) => x.id == tipo.value
          ).descricao;
          if (retorno.data != null) {
            this.colaborador = ColaboradorModel.fromJson(retorno.data);

            this.colaborador.tipoColaborador.id = tipo.value;
            if (this.colaborador.idDoTipo == 0) {
              this.colaborador.ativo = true;
              this.modelForm.patchValue(this.colaborador);
              this.currentAction = 'novo';
              this.setCurrentAction();

              this.solicitarConfirmacaoDeAcao(
                1,
                descricaoDoTipo,
                this.colaborador.nome
              );
            } else {
              this.solicitarConfirmacaoDeAcao(
                2,
                descricaoDoTipo,
                this.colaborador.nome
              );

              return;
            }
            // this.imgFile = this.colaborador.fotoBase64;
            this.showLoading(false);
          } else if (retorno.status == 'NOK') {
            this.showLoading(false);
            this.toastr.info(
              '<h4>INCLUSÃO</h4> <p>Colaborador: <b>' +
                cpf.value +
                '</b> com o tipo <b>' +
                descricaoDoTipo + '</b></p>'
            );
          }

          this.removerCamposComBaseNoTipo();
        },
        (error) => this.actionsForError(error)
      );
    }
  }

  public clear(): void {
    this.limparAbasInvalidas();

    if (this.currentAction == 'novo') {
      this.clearForm();
      this.buscouColaborador = false;
    } else {
      const baseComponentPath: string = this.route.snapshot.parent.url[0].path;
      //retorna para o componente de listagem
      this.router.navigate([baseComponentPath, 'novo']);
    }
  }

  public search() {
    this.getColaborador();
  }


  onImageChange(e) {
    if (e.target.files && e.target.files.length) {
      const [file] = e.target.files;

      if (
        file.type == 'image/png' ||
        file.type == 'image/jpg' ||
        file.type == 'image/jpeg'
      ) {
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = () => {
          const imgFile = reader.result as string;
          this.modelForm.patchValue({ fotoBase64: imgFile });
        };

        e.target.files = null;
      } else {
        this.toastr.error('Imagem inválida');
      }
    }
  }

  public buscarCEP() {
    this.showLoading();
    let controlArray = <FormArray>this.modelForm.get('enderecos');

    let enderecoVarLocal = controlArray.at(0);

    const cep = enderecoVarLocal.value.cep;
    if (cep != null && cep != '') {
      this.cepService.getById(cep).subscribe(
        (retorno) => {
          if (retorno.data != null) {
            const endereco = EnderecoModel.fromJson(retorno.data);

            enderecoVarLocal.patchValue(endereco);
          } else if (retorno.status == 'NOK') {
            this.toastr.error(retorno.mensagem);
          }
          this.showLoading(false);
        },
        (error) => this.actionsForError(error)
      );
    } else {
      this.toastr.error('Informe um cep válido','',{positionClass: 'toast-center-center'});
    }
    this.showLoading(false);
  }

  public clearEndereco(e) {
    const controlArray = <FormArray>this.modelForm.get('enderecos');
    const enderecoVarLocal = controlArray.at(0);
    const cep = e.target.value.replace('-', '');

    enderecoVarLocal.reset();

    enderecoVarLocal.patchValue({ cep: cep });

    this.ValidatorsResidenciaExterior(cep);
  }

  public ValidatorsResidenciaExterior(cep: string) {
    const campos: string[] = ['codigoPostal', 'descricao', 'bairro', 'cidade'];
    if (cep == '' || cep == null) {
      campos.forEach((campo) => {
        const controle = this.modelForm.get('residenciaExterior').get(campo);
        controle.setValidators([Validators.required]);
        controle.updateValueAndValidity();
      });
      const controleCombo = this.modelForm
        .get('residenciaExterior')
        .get('paisResidencia')
        .get('id');
      controleCombo.setValidators([Validadores.comboSelecione()]);
      controleCombo.updateValueAndValidity();
    } else {
      campos.forEach((campo) => {
        const controle = this.modelForm.get('residenciaExterior').get(campo);
        controle.clearValidators();
        controle.setErrors(null);
        controle.updateValueAndValidity();
      });

      const controleCombo = this.modelForm
        .get('residenciaExterior')
        .get('paisResidencia')
        .get('id');
      controleCombo.clearValidators();
      controleCombo.setErrors(null);
    }
  }

  public adicionar() {
    let controlArray = <FormArray>(
      this.modelForm.get('deficiencia').get('classificacaoDeficiencias')
    );
    const objeto = { id: 2 };
    controlArray.push(this.formBuilder.group(objeto));
  }
  public remover() {}

  change(e) {
    let controlArray = <FormArray>(
      this.modelForm.get('deficiencia').get('classificacaoDeficiencias')
    );
    if (e.target.checked) {
      const valor: number = +e.target.value;
      const objeto = { id: valor };
      this.deficienciasMarcadas[e.target.value] = 'true';
      controlArray.push(this.formBuilder.group(objeto));
    } else {
      const index = controlArray.controls.findIndex(
        (x) => x.value.id === +e.target.value
      );
      this.deficienciasMarcadas[+e.target.value] = null;
      controlArray.removeAt(index);
    }
  }

  setSalBase(value) {
    if (value == '7') {
      this.modelForm.patchValue({ salarioBase: '0,00' });
    }
  }


  public editDependente(id: number) {
    const dependente = this.dependentes.find((x) => x.id == id);

    this.modelFormDependente.patchValue(dependente);

    // this.modelForm.get("dependente").patchValue(dependente);
  }

  public removeDependente(id: number) {
    this.dependentes = this.dependentes.filter((x) => x.id != id);
  }

  public gravarEditarDependentes() {
    if (!this.isFormValid(this.modelFormDependente)) return;

    const dependente = this.modelFormDependente;
    dependente.value.tipoDependente.descricao = this.comboService.tiposDependentes.find(
      (x) => x.id == dependente.value.tipoDependente.id
    ).descricao;

    if (this.ehCPFDepIgualCPFColaborador(dependente.value.cpf)) {
      this.toastr.error(
        'O CPF do dependente deve ser diferente do CPF do colaborador'
      );
    } else if (
      this.existeCPFDependenteNoArray(dependente.value.id, dependente.value.cpf)
    ) {
      this.toastr.error('Já existe dependente cadastrado com esse CPF');
    } else {
      if (dependente.value.id > 0) this.removeDependente(dependente.value.id);
      else dependente.value.id = this.getRandomId();

      this.dependentes.push(dependente.value);
      this.dependentes = this.dependentes.sort((a, b) =>
        a.nome.toString().toLocaleLowerCase() >
        b.nome.toString().toLocaleLowerCase()
          ? 1
          : -1
      );
      this.limparDependente();
    }
  }

  private existeCPFDependenteNoArray(id: number, cpf: string) {
    const existe = this.dependentes.find((x) => x.id != id && x.cpf == cpf);
    if (existe == undefined) return false;
    else return true;
  }

  private ehCPFDepIgualCPFColaborador(cpf: string) {
    const colaboradorCPF = this.modelForm.value.cpf;

    return cpf == colaboradorCPF;
  }

  protected isValidToSubmit(): boolean {
    this.model.dependentes = this.dependentes;
    this.model.afastamentos = this.afastamentos;
    this.model.cursosExtraCurriculares = this.cursosExtraCurriculares;
    this.model.experienciasProfissional = this.experiencias;
    this.model.informacoesAcademica = this.informacoesAcademica;

    const campos: string[] = ['codigoPostal', 'descricao', 'bairro', 'cidade'];
    this.setFieldHourJob();
    const retorno = this.isFormValid(this.modelForm);

    if (retorno) return true;

    this.limparAbasInvalidas();

    this.processarAbasInvalidas(this.modelForm);

    this.toastr.error('Verifique as seções indicadas com [*]');

    return false;
  }

  private limparAbasInvalidas() {
    for (let key in this.abasInvalidas) {
      this.abasInvalidas[key] = false;
    }
  }

  private processarAbasInvalidas(container: FormGroup | FormArray): void {
    for (let controlKey in container.controls) {
      let c = container.controls[controlKey];
      if (c.invalid && c['errorGroup'] != null) {
        this.abasInvalidas[c['errorGroup']] = true;
      } else {
        this.processarAbasInvalidas(c);
      }
    }
  }

  public limparDependente() {
    this.modelFormDependente.reset();
    this.modelFormDependente.get('tipoDependente').patchValue({ id: 0 });
  }


  public clearEnderecoInstituicao(e) {
    const endInstituicaoEnsino = this.modelForm
      .get('dadoEstagio')
      .get('enderecoInstEnsino');

    endInstituicaoEnsino.reset();
    endInstituicaoEnsino.patchValue({ cep: e.target.value.replace('-', '') });
  }

  public buscarCEPInstituicao() {
    const endInstituicaoEnsino = this.modelForm
      .get('dadoEstagio')
      .get('enderecoInstEnsino');
    const cep = endInstituicaoEnsino.value.cep;

    if (cep != null && cep != '') {
      this.cepService.getById(cep).subscribe(
        (retorno) => {
          if (retorno.data != null) {
            const endereco = EnderecoModel.fromJson(retorno.data);

            endInstituicaoEnsino.patchValue(endereco);
          } else if (retorno.status == 'NOK') {
            this.toastr.error(retorno.mensagem);
          }
        },
        (error) => this.actionsForError(error)
      );
    } else {
      this.toastr.error('Informe o cep');
    }
  }

  //início métodos afastamento



  public editAfastamento(id: number) {
    const afastamento = this.afastamentos.find((x) => x.id == id);

    this.modelFormAfastamento.patchValue(afastamento);
  }

  public removeAfastamento(id: number) {
    this.afastamentos = this.afastamentos.filter((x) => x.id != id);
  }

  public limparAfastamento() {
    this.modelFormAfastamento.reset();
    this.modelFormAfastamento.get('motivoAfastamento').patchValue({ id: 0 });
  }

  public gravarEditarAfastamento() {
    if (!this.isFormValid(this.modelFormAfastamento)) return;

    let afastamentosAux = Object.assign([], this.afastamentos);
    afastamentosAux = this.ordenarAfastamentos(afastamentosAux);

    const afastamento = this.modelFormAfastamento;
    afastamento.value.motivoAfastamento = this.comboService.motivoAfastamento.find(
      (x) => x.id == afastamento.value.motivoAfastamento.id
    );

    if (afastamento.value.id != 0)
      afastamentosAux = afastamentosAux.filter(
        (x) => x.id != afastamento.value.id
      );
    else afastamento.value.id = this.getRandomId();

    afastamentosAux.push(afastamento.value);

    const validacao = this.listaDeAfastamentoEhValida(afastamentosAux);
    if (validacao == null) {
      this.afastamentos = Object.assign([], afastamentosAux);
      this.afastamentos = this.ordenarAfastamentos(this.afastamentos);
      afastamentosAux = null;
      this.limparAfastamento();
    } else {
      this.toastr.error(validacao);
    }
  }

  private listaDeAfastamentoEhValida(lista: AfastamentoModel[]): string {
    lista = this.ordenarAfastamentos(lista, false);
    for (let i = 0; i <= lista.length - 1; i++) {
      const afastamento = lista[i];
      const ehUltimo = i == lista.length - 1;

      if (!ehUltimo) {
        if (afastamento.dataTermino == null)
          return (
            'Afastamento com iníco em ' +
            afastamento.dataInicio +
            ' deve possuir data de término.'
          );
        if (afastamento.dataTermino == '')
          return (
            'Afastamento com iníco em ' +
            afastamento.dataInicio +
            ' deve possuir data de término.'
          );
      } else {
        if (
          moment(afastamento.dataTermino, 'DD/MM/YYYY').isAfter(moment()) &&
          afastamento.motivoAfastamento.id != 15
        ) {
          return (
            'Afastamento com início em ' +
            afastamento.dataInicio +
            ' não deve possuir data de término superior a data de hoje.'
          );
        }
        if (
          moment(afastamento.dataTermino, 'DD/MM/YYYY').isAfter(
            moment().add(60, 'days')
          ) &&
          afastamento.motivoAfastamento.id == 15
        ) {
          return (
            'Afastamento com iníco em ' +
            afastamento.dataInicio +
            ' não deve possuir data de término superior à 60 dias da data atual.'
          );
        }
      }

      if (i >= 1) {
        const afastamentoAnterior = lista[i - 1];
        if (
          moment(afastamento.dataInicio, 'DD/MM/YYYY').isSameOrBefore(
            moment(afastamentoAnterior.dataTermino, 'DD/MM/YYYY')
          )
        ) {
          return (
            'Data de Início deve ser maior que ' +
            afastamentoAnterior.dataTermino +
            ' para o afastamento com iníco em ' +
            afastamento.dataInicio
          );
        }
      }
    }

    return null;
  }
  private ordenarAfastamentos(lista: AfastamentoModel[], desc: boolean = true) {
    if (lista != null)
      if (lista.length > 0)
        return lista.sort((a, b) => {
          var data1 = moment(a.dataInicio.toString(), 'DD/MM/YYYY');
          var data2 = moment(b.dataInicio.toString(), 'DD/MM/YYYY');
          if (desc) return data1.isBefore(data2) ? 1 : -1;
          else return data1.isBefore(data2) ? -1 : 1;
        });

    return lista;
  }

  //fim métodos afastamento

  //inicio métodos cursos extra curriculares
  public editCursoExtraCurricular(id: number) {
    const curso = this.cursosExtraCurriculares.find((x) => x.id == id);

    this.modelFormCursoExtraCurriculares.patchValue(curso);
  }

  public removeCursoExtraCurricular(id: number) {
    this.cursosExtraCurriculares = this.cursosExtraCurriculares.filter(
      (x) => x.id != id
    );
  }

  public gravarEditarCursoExtraCurricular() {
    if (!this.isFormValid(this.modelFormCursoExtraCurriculares)) return;

    const curso = this.modelFormCursoExtraCurriculares;
    if (
      this.existeDescricaoDoCursoNoArray(curso.value.id, curso.value.descricao)
    ) {
      this.toastr.error('Já existe curso cadastrado com essa descrição.');
    } else {
      if (curso.value.id > 0) this.removeCursoExtraCurricular(curso.value.id);
      else curso.value.id = this.getRandomId();

      this.cursosExtraCurriculares.push(curso.value);
      this.cursosExtraCurriculares = this.cursosExtraCurriculares.sort((a, b) =>
        a.descricao > b.descricao ? 1 : -1
      );
      this.limparCursoExtraCurricular();
    }
  }

  public limparCursoExtraCurricular() {
    this.modelFormCursoExtraCurriculares.reset();
  }

  private existeDescricaoDoCursoNoArray(id: number, descricao: string) {
    const existe = this.cursosExtraCurriculares.find(
      (x) =>
        x.id != id &&
        x.descricao.toLocaleLowerCase() == descricao.toLocaleLowerCase()
    );
    return existe != undefined;
  }

  //fim métodos cursos extra curriculares

  //Inicio métodos Experiencia Profissional
  public gravarEditarExperiencias() {
    // if(this.experiencias.length > 9){
    //   this.toastr.warning('Limite de 10 experiências atingido!');
    //   return;
    // }
    if (!this.isFormValid(this.modelFormExperiencias)) return;

    const experiencia = this.modelFormExperiencias;

    // if (
    //   Number(experiencia.value.ano) > Number(moment().format('YYYY')) ||
    //   Number(experiencia.value.ano) < 1900
    // ) {
    //   this.toastr.error(
    //     'O ano deve ser menor ou igual ao ano atual e maior que 1899'
    //   );
    // } else {
      if (experiencia.value.id != 0)
        this.removeExperiencia(experiencia.value.id);
      else experiencia.value.id = this.getRandomId();

      this.experiencias.push(experiencia.value);
      this.experiencias = this.ordenarExperiencias(this.experiencias);
      this.limparExperiencia();
    //}
  }

  public editExperiencia(id: number) {
    const experiencia = this.experiencias.find((x) => x.id == id);

    this.modelFormExperiencias.patchValue(experiencia);
  }

  public removeExperiencia(id: number) {
    this.experiencias = this.experiencias.filter((x) => x.id != id);
  }

  public limparExperiencia() {
    this.modelFormExperiencias.reset();
    this.modelFormExperiencias.patchValue({ id: 0 });
  }

  private ordenarExperiencias(lista: ExperienciaProfissionalModel[]) {
    if (lista != null)
      lista.sort((a, b) =>
        a['dataInicioPeriodo'].toString().toLocaleLowerCase() <
        b['dataInicioPeriodo'].toString().toLocaleLowerCase()
          ? 1
          : -1
      );

    return lista;
  }
  //Fim métodos Experiencia Profissional

  public clearPhoto(id: number) {
    this.photoFile.nativeElement.value = '';
    this.modelForm.patchValue({ fotoBase64: null });
  }

  protected creationPageTitle(): string {
    return 'Cadastro de Colaborador';
  }

  protected editionPageTitle(): string {
    const titulo = this.model.nome || '';
    return 'Edição de Colaborador: ' + titulo;
  }

  public redirectToEdit(idDoTipo: number): void {
    const baseComponentPath: string = this.route.snapshot.parent.url[0].path;
    //recarrega o componente com o recurso criado e permite edição
    this.router
      .navigateByUrl(baseComponentPath, { skipLocationChange: true })
      .then(() =>
        this.router.navigate([baseComponentPath, idDoTipo, 'alteracao'])
      );
  }

  public changePaisNascimento() {
    const paisSelecionado = this.modelForm
      .get('paisNascimento')
      .get('id').value;

    const tempoResidenciaEstrangeiro = this.modelForm
      .get('tempoResidenciaEstrangeiro')
      .get('id');
    const classificacaoTrabEstrangeiro = this.modelForm
      .get('classificacaoTrabEstrangeiro')
      .get('id');

    if (paisSelecionado == 1) {
      // brasil
      tempoResidenciaEstrangeiro.clearValidators();
      classificacaoTrabEstrangeiro.clearValidators();

      tempoResidenciaEstrangeiro.setErrors(null);
      classificacaoTrabEstrangeiro.setErrors(null);
    } else {
      tempoResidenciaEstrangeiro.setValidators([Validadores.comboSelecione()]);
      classificacaoTrabEstrangeiro.setValidators([
        Validadores.comboSelecione(),
      ]);

      tempoResidenciaEstrangeiro.updateValueAndValidity();
      classificacaoTrabEstrangeiro.updateValueAndValidity();
    }
  }

  submitForm() {
    this.model = this.jsonDataToFn(this.modelForm.value);
    if (this.isValidToSubmit()) {
      this.submittingForm = true;

      if (this.currentAction == 'novo') {
        this.createModel(this.model);
      } else {
        if(this.model.tipoColaborador.id == 1){
          this.verificarExiste2300Enviado();

        } else {
          this.updateModel(this.model);
        }
      }
    }
  }

  public verificarExiste2300Enviado(){

    this.esocialService.existe2300Enviado(this.model.id, this.model.tipoColaborador.id)
    .subscribe (
      (retorno) => {
                      if (retorno.status == 'NOK' )
                        this.updateModel(this.model);
                      else
                        this.solicitarConfirmacaoAlteracao();
                    },
      (error) => { this.actionsForError(error);}
    );
  }

  public solicitarConfirmacaoAlteracao() {

    this.showLoading(false);

    this.modalService.openDialog(this.viewRef, {
      title: 'Confirmação',
      childComponent: ModalColaboradorComponent,
      data: {
        modelForm: this.modelForm
      },

      settings: this.settingsModalTrataContraste,

      actionButtons: [
        {
          text: 'RETIFICAÇÃO',
          buttonClass: this.classeBotaConfirmModalTrataContraste,
          onAction: () => {
            const protocolo  = this.modelForm.get("protocolo");
            if(protocolo.status == 'VALID' &&  protocolo.value != "" && protocolo.value != undefined ){
              this.model.protocolo = protocolo.value;
              this.updateModel(this.model);
              return true;
            } else  {
              this.toastr.warning("Recibo necessário para cadastro de retificadora");
              return false;
            }

          },
        },
        {
          text: 'ATUALIZAÇÃO',
          buttonClass: this.classeBotaConfirmModalTrataContraste,
          onAction: () => {
            const protocolo  = this.modelForm.get("protocolo");
            protocolo.value == "";
            this.updateModel(this.model);
            return true;
          },
        },
        {
          text: 'Cancelar',
          buttonClass: this.classeBotaNaoModalTrataContraste,
          onAction: () => {
            this.clear();
            return true;
          },
        }
      ],
    });
  }
  protected actionsForSuccess(model: ColaboradorModel) {
    this.showLoading(false);

    this.serverErrorMessages = null;
    this.solicitarConfirmacaoDeRedirecionamento();
  }

  public solicitarConfirmacaoDeRedirecionamento() {
    let mensagem = `
     Deseja ser redirecionado para o envio de eventos do eSocial?
    `;

    this.showLoading(false);

    this.modalService.openDialog(this.viewRef, {
      title: 'Confirmação de Redirecionamento',
      childComponent: ModalConfirmComponent,
      data: {
        texto: mensagem,
      },

      settings: this.settingsModalTrataContraste,

      actionButtons: [
        {
          text: 'Sim',
          buttonClass: this.classeBotaSimModalTrataContraste,
          onAction: () => {
            this.router.navigate(['/evento-esocial'])
            this.toastr.success('Solicitação processada com sucesso!!!');
            return true;
          },
        },
        {
          text: 'Não',
          buttonClass: this.classeBotaNaoModalTrataContraste,
          onAction: () => {
            this.router.navigate(['/colaborador'])
            this.toastr.success('Solicitação processada com sucesso!!!');
            return true;
          },
        },
      ],
    });
  }

  public verificaTipoColaborador(): boolean {
    const valor = this.modelForm.get('tipoColaborador').get('id').value

    if(valor == 1){
      const controle = this.modelForm.get('dadoTSVE').get('dataInicio');
      controle.clearValidators();
      controle.setErrors(null);
      controle.updateValueAndValidity();
      return true;
    }

    return false;
  }

  public incluirDataInicio(): void {
    this.modelForm.get('dadoTSVE').get('dataInicio').setValue(this.modelForm.get('dadoEstagio').get('dataInicio').value);
  }

  public changeHorarioDinamico(e){
    const controle = this.modelForm.get('dadoEstagio').get('horarioInicio');
    const controle2 = this.modelForm.get('dadoEstagio').get('horarioTermino');

    if (e.target.checked) {
      controle.setValue(null);
      controle.clearValidators();
      controle.setErrors(null);

      controle2.setValue(null);
      controle2.clearValidators();
      controle2.setErrors(null);
    } else {
      controle.setValidators([Validators.required]);
      controle2.setValidators([Validators.required]);
    }

    controle2.updateValueAndValidity();
    controle.updateValueAndValidity();
  }

  public limparInformacoesAcademica() {
    this.modelFormInformacoesAcademica.reset();
    this.modelFormInformacoesAcademica.get('situacao').patchValue({ id: 0 });
    if (!this.isRegister) {
      this.modelForm.get('grauInstrucao').patchValue({ id: 0 });
    }
  }

  public gravarEditarInformacoesAcademica() {
    if (!this.isFormValid(this.modelFormInformacoesAcademica)) return;

    this.isRegister = true;

    const informacoesAcademica = this.modelFormInformacoesAcademica;
    if (informacoesAcademica.value.id > 0) this.removeInformacoesAcademica(informacoesAcademica.value.id);

    informacoesAcademica.value.situacao.descricao = this.comboService.situacao.find(
      (x) => x.id == informacoesAcademica.value.situacao.id).descricao;

      this.informacoesAcademica.push(informacoesAcademica.value);
      this.informacoesAcademica = this.informacoesAcademica.sort((a, b) =>
        a.curso.toString().toLocaleLowerCase() >
        b.curso.toString().toLocaleLowerCase()
          ? 1
          : -1
      );

      this.limparInformacoesAcademica();

      this.isRegister = false;
  }

  public editInformacoesAcademica(id: number) {
    const informacoesAcademica = this.informacoesAcademica.find((x) => x.id == id);
    this.modelFormInformacoesAcademica.patchValue(informacoesAcademica);
  }

  public removeInformacoesAcademica(id: number) {
    this.informacoesAcademica = this.informacoesAcademica.filter((x) => x.id != id);
  }

  public changeHorarioDinamicoTrabalho(e){
    const hInicioTrabalho = this.modelForm.get('horarioInicioTrabalho');
    const hTerminoTrabalho = this.modelForm.get('horarioTerminoTrabalho');

    if (e.target.checked) {
      hInicioTrabalho.setValue(null);
      hInicioTrabalho.clearValidators();
      hInicioTrabalho.setErrors(null);

      hTerminoTrabalho.setValue(null);
      hTerminoTrabalho.clearValidators();
      hTerminoTrabalho.setErrors(null);
      this.desabilitaCampos = true;
    } else {
      hInicioTrabalho.setValidators([Validators.required]);
      hTerminoTrabalho.setValidators([Validators.required]);
      this.desabilitaCampos = false;
    }

    hTerminoTrabalho.updateValueAndValidity();
    hInicioTrabalho.updateValueAndValidity();
  }

  setFieldHourJob() {
    const hInicioTrabalho = this.modelForm.get('horarioInicioTrabalho');
    const hTerminoTrabalho = this.modelForm.get('horarioTerminoTrabalho');
    const tipoColaborador = this.modelForm.get('tipoColaborador').get('id');

    if (tipoColaborador.value != 1) {
      hInicioTrabalho.setValidators([Validators.required]);
      hTerminoTrabalho.setValidators([Validators.required]);

      hTerminoTrabalho.updateValueAndValidity();
      hInicioTrabalho.updateValueAndValidity();
    }
  }

  ValidarCampoCurso(e){
    const valueGrauInstrucao = [8, 9, 10, 11, 12];

    if (valueGrauInstrucao.find(x => x == e.target.value) > 0 ){
      if (this.model.informacoesAcademica.length == 0) {
        this.toastr.warning("[*] Para este grau de instrução, deverá cadastrar pelo menos um curso.");
      }
    }
  }

}
