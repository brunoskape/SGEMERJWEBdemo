import { environment } from 'src/environments/environment';
import {
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
  FormGroup,
  FormArray,
  Validators,
  FormControl,
} from '@angular/forms';
import * as moment from 'moment';
import { BaseValidator } from 'src/app/shared/validator/base.validator';
import { Validadores } from 'src/app/shared/validator/custom.validator';

export class ValidadoresColaborador extends BaseValidator {
  static cpfDependente(): ValidatorFn {
    return (group: FormGroup): ValidationErrors | null => {
      const cpf: string = group.controls['cpf'].value;
      const temIRRF: boolean = group.controls['temIRRF'].value;

      if (temIRRF) {
        if (cpf == '' || cpf == null) {
          group.controls['cpf'].setErrors({
            custom: {
              message: '[*] Dado obrigatório.',
            },
          });
        }
      }

      if (cpf != null) {
        if (cpf != '') {
          if (!this.isCpfValid(cpf)) {
            group.controls['cpf'].setErrors({
              custom: {
                message: '[*] CPF inválido.',
              },
            });
            return null;
          }
        }
      }

      group.controls['cpf'].setErrors(null);
      return null;
    };
  }

  static nascimentoDependente(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value == null) return null;

      const valorAtual: string = control.value.toString();
      if (!this.isDateValid(valorAtual)) {
        return {
          custom: {
            message: '[*] Data de Nascimento inválida.',
          },
        };
      }
      //O campo Data de Nascimento deverá maior ou igual que 01/01/1890 e menor ou igual à data atual;
      let isInvalid = moment(valorAtual, 'DD/MM/YYYY').isBefore(
        moment('01/01/1890', 'DD/MM/YYYY')
      );

      if (isInvalid) {
        return {
          custom: {
            message:
              '[*] Data de Nascimento deve ser maior ou igual a 01/01/1890.',
          },
        };
      }

      let isInvalidNow = moment(valorAtual, 'DD/MM/YYYY').isAfter(moment());

      if (isInvalidNow) {
        return {
          custom: {
            message:
              '[*] Data de Nascimento deve ser menor ou igual que a data atual.',
          },
        };
      }

      return null;
    };
  }

  static horarioEstagio(): ValidatorFn {
    return (group: FormGroup): ValidationErrors | null => {
      if (
        group.controls['horarioInicio'].value == null ||
        group.controls['horarioTermino'].value == null ||
        group.controls['horarioInicio'].value == '' ||
        group.controls['horarioTermino'].value == ''
      )
        return null;
      const hInicio: string =
        '01/01/2000 ' + group.controls['horarioInicio'].value;
      const hFim: string =
        '01/01/2000 ' + group.controls['horarioTermino'].value;

      const inicio = moment(new Date(hInicio));
      const fim = moment(new Date(hFim));

      if (inicio.isSameOrAfter(fim)) {
        group.controls['horarioInicio'].setErrors({
          custom: {
            message: '[*] Horário de Estágio inválido.',
          },
        });

        group.controls['horarioTermino'].setErrors({
          custom: {
            message: '[*] Horário de Estágio inválido.',
          },
        });

        return null;
      }

      group.controls['horarioInicio'].setErrors(null);
      group.controls['horarioTermino'].setErrors(null);

      return null;
    };
  }

  static datasEstagio(): ValidatorFn {
    return (group: FormGroup): ValidationErrors | null => {
      if (
        group.controls['dataInicio'].value == null ||
        group.controls['dataInicio'].value == '' ||
        group.controls['dataPrevistaTermino'].value == null ||
        group.controls['dataPrevistaTermino'].value == ''
      ) {
        return null;
      }

      const dInicio: string = group.controls['dataInicio'].value;
      const dFim: string = group.controls['dataPrevistaTermino'].value;

      if (!this.isDateValid(dInicio) || !this.isDateValid(dFim)) {
        return null;
      }

      const inicio = moment(dInicio, 'DD/MM/YYYY');
      const fim = moment(dFim, 'DD/MM/YYYY');

      if (inicio.isSameOrAfter(fim)) {
        group.controls['dataInicio'].setErrors({
          custom: {
            message: '[*] Período de Estágio inválido.',
          },
        });

        group.controls['dataPrevistaTermino'].setErrors({
          custom: {
            message: '[*] Período de Estágio inválido.',
          },
        });
        return null;
      }

      group.controls['dataInicio'].setErrors(null);
      group.controls['dataPrevistaTermino'].setErrors(null);

      return null;
    };
  }

  static datasAfastamento(): ValidatorFn {
    return (group: FormGroup): ValidationErrors | null => {
      if (
        group.controls['dataInicio'].value == null ||
        group.controls['dataInicio'].value == '' ||
        group.controls['dataTermino'].value == null ||
        group.controls['dataTermino'].value == ''
      ) {
        return null;
      }

      const dInicio: string = group.controls['dataInicio'].value;
      const dFim: string = group.controls['dataTermino'].value;

      if (!this.isDateValid(dInicio) || !this.isDateValid(dFim)) {
        return null;
      }

      group.controls['dataInicio'].setErrors(null);
      group.controls['dataTermino'].setErrors(null);

      const inicio = moment(dInicio, 'DD/MM/YYYY');
      const fim = moment(dFim, 'DD/MM/YYYY');

      if (inicio.isSameOrAfter(fim)) {
        group.controls['dataInicio'].setErrors({
          custom: {
            message: '[*] Período de Afastamento inválido.',
          },
        });

        group.controls['dataTermino'].setErrors({
          custom: {
            message: '[*] Período de Afastamento inválido.',
          },
        });
        return null;
      }

      return null;
    };
  }
  static dadosInstituicaoEnsino(): ValidatorFn {
    return (group: FormGroup): ValidationErrors | null => {
      const campos = ['cep', 'nomeLogradouro'];
      const cnpj: string = group.controls['cnpjInstEnsino'].value;
      const enderecoInstEnsino = group.get('enderecoInstEnsino')['controls'];
      const controle = group.get('razaoSocialInstEnsino');

      if (cnpj == '' || cnpj == null) {
        if(controle.value == '' || controle.value == null){
          controle.setErrors({
            custom: {
              message:
              '[*]  Informe o CNPJ ou a Razão Social Instituição de Ensino.',
          },
        });
        } else {
          controle.setErrors(null);
      }
        const cep: string =
          group.get('enderecoInstEnsino')['controls']['cep'].value;
        if (true) {
          campos.forEach((campo) => {
            if (
              group.get('enderecoInstEnsino')['controls'][campo].value == '' ||
              group.get('enderecoInstEnsino')['controls'][campo].value == null
            )
              enderecoInstEnsino['cep'].setErrors({
                custom: {
                  message:
                    '[*]  Informe o CNPJ ou o Endereço completo da Instituição de Ensino.',
                },
              });
          });
          return null;
        }
      } else {
        controle.setErrors(null);
      }

      enderecoInstEnsino['cep'].setErrors(null);

      return null;
    };
  }

  static dadosTSVEDataInicio(): ValidatorFn {
    return (group: FormGroup): ValidationErrors | null => {
      let controleDataInicio:AbstractControl;
      let dataInicio:any;
      let dataNascimento:any;

      if(group.get('tipoColaborador').get('id').value == 1 ){
        controleDataInicio = group.get('dadoEstagio').get('dataInicio');
        dataInicio = group.value.dadoEstagio.dataInicio;
        dataNascimento = group.value.nascimento;
      } else {
       controleDataInicio = group.get('dadoTSVE').get('dataInicio');
       dataInicio = group.value.dadoTSVE.dataInicio;
       dataNascimento = group.value.nascimento;

      }
      if (dataNascimento == null || dataInicio == null) return null;

      if (!this.isDateValid(dataNascimento) || !this.isDateValid(dataInicio)) {
        return null;
      }

      const inicio = moment(dataInicio, 'DD/MM/YYYY');
      const nascimento = moment(dataNascimento, 'DD/MM/YYYY');

      if (inicio.isSameOrBefore(nascimento)) {
        controleDataInicio.setErrors({
          custom: {
            message: '[*] Data deve ser posterior a data de nascimento.',
          },
        });

        return null;
      }

      const tipo = group.value.dadoTSVE.cadastramentoInicial.id;
      const DATA_INICIO_EVENTOS = environment.DATA_INICIO_EVENTOS;
      const dataInicioEventos = moment(DATA_INICIO_EVENTOS, 'DD/MM/YYYY');

      if (tipo == 1) {
        if (inicio.isSameOrAfter(dataInicioEventos)) {
          controleDataInicio.setErrors({
            custom: {
              message: '[*] Data deve ser anterior a ' + DATA_INICIO_EVENTOS + '.'
            },
          });

          return null;
        }
      } else if (tipo == 2) {
        if (inicio.isBefore(dataInicioEventos)) {
          controleDataInicio.setErrors({
            custom: {
              message: '[*] Data deve ser igual ou posterior a ' + DATA_INICIO_EVENTOS + '.'
            },
          });

          return null;
        }
      }

      controleDataInicio.setErrors(null);

      return null;
    };
  }

  static nascimentoColaborador(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value == null) return null;

      const valorAtual: string = control.value.toString();
      if (!this.isDateValid(valorAtual)) {
        return {
          custom: {
            message: '[*] Data de Nascimento inválida.',
          },
        };
      }
      //O campo Data de Nascimento deverá maior ou igual que 01/01/1890 e menor ou igual à data atual;
      let isInvalid = moment(valorAtual, 'DD/MM/YYYY').isBefore(
        moment('01/01/1890', 'DD/MM/YYYY')
      );

      if (isInvalid) {
        return {
          custom: {
            message:
              '[*] Data de Nascimento deve ser maior ou igual a 01/01/1890.',
          },
        };
      }

      let isInvalidNow = moment(valorAtual, 'DD/MM/YYYY').isAfter(moment());

      if (isInvalidNow) {
        return {
          custom: {
            message:
              '[*] Data de Nascimento deve ser menor ou igual a data atual.',
          },
        };
      }

      return null;
    };
  }

  static dadosTrabalhadorEstrangeiro(): ValidatorFn {
    return (group: FormGroup): ValidationErrors | null => {

      const tempoResidenciaEstrangeiro = group.get('tempoResidenciaEstrangeiro').get('id');
      const classificacaoTrabEstrangeiro = group.get('classificacaoTrabEstrangeiro').get('id');

      if (tempoResidenciaEstrangeiro.value == 0 || classificacaoTrabEstrangeiro.value == 0) return null;

      if (tempoResidenciaEstrangeiro.value == 1) {
        if (classificacaoTrabEstrangeiro.value == 2 || classificacaoTrabEstrangeiro.value == 5) {
          classificacaoTrabEstrangeiro.setErrors({
            custom: {
              message: '[*] Classificação inválida para o Tempo de Residência informado.',
            },
          });

          return null;
        }
      } else {
        if (classificacaoTrabEstrangeiro.value == 1) {
          classificacaoTrabEstrangeiro.setErrors({
            custom: {
              message: '[*] Classificação inválida para o Tempo de Residência informado.',
            },
          });

          return null;
        }
      }

      classificacaoTrabEstrangeiro.setErrors(null);

      return null;
    };
  }

  static dadosDeficiencia(): ValidatorFn {
    return (group: FormGroup): ValidationErrors | null => {
      const ehPortadorDeNecessidadeEspecial = group.get('deficiencia').get('ehPortadorDeNecessidadeEspecial');

      if (ehPortadorDeNecessidadeEspecial.value == true) {

        const controlArray = <FormArray>(
          group.get('deficiencia').get('classificacaoDeficiencias')
        );

        if (controlArray.length == 0) {
          ehPortadorDeNecessidadeEspecial.setErrors({
            custom: {
              message: '[*] Ao menos uma deficiência deve ser informada.',
            },
          });

          return null;
        }
      }

      ehPortadorDeNecessidadeEspecial.setErrors(null);

      return null;
    };
  }

  static dadosEnderecoExterior(): ValidatorFn {
    return (group: FormGroup): ValidationErrors | null => {
      const endereco = (<FormArray>(
        group.get('enderecos')
      )).at(0);

      const campos: string[] = ['codigoPostal', 'descricao', 'bairro', 'cidade']

      if (endereco.value.cep == '' ||
        endereco.value.cep == null ||
        endereco.value.nomeLogradouro == '' ||
        endereco.value.nomeLogradouro == null) {

        campos.forEach(campo => {
          const controle = group.get('residenciaExterior').get(campo);
          controle.setValidators([Validators.required])
        })
        const controleCombo = group.get('residenciaExterior').get('paisResidencia').get('id');
        controleCombo.setValidators([Validadores.comboSelecione()])

      } else {
        campos.forEach(campo => {
          const controle = group.get('residenciaExterior').get(campo);
          controle.clearValidators();
          controle.setErrors(null);
        })


        const controleCombo = group.get('residenciaExterior').get('paisResidencia').get('id');
        controleCombo.clearValidators();
        controleCombo.setErrors(null);
      }
      return null;
    };
  }

  static dadosEnderecoExteriorValida(): ValidatorFn {
    return (group: FormGroup): ValidationErrors | null => {
      const endereco = (<FormArray>group.get('enderecos')).at(0);

      let ehValido = false;

      if (
        !this.isNullOrEmpty(endereco.value.cep) &&
        !this.isNullOrEmpty(endereco.value.nomeLogradouro)
      ) {
        ehValido = true;
      }

      if (
        !this.isNullOrEmpty(
          group.get('residenciaExterior').get('codigoPostal').value
        ) &&
        !this.isNullOrEmpty(
          group.get('residenciaExterior').get('descricao').value
        ) &&
        !this.isNullOrEmpty(
          group.get('residenciaExterior').get('bairro').value
        ) &&
        !this.isNullOrEmpty(group.get('residenciaExterior').get('cidade').value)
      ) {
        ehValido = true;
      }


      if (!ehValido) {
        endereco.get('cep').setErrors({
          custom: {
            message:
              '[*] Informe o endereço completo ou os dados de Residente no Exterior.',
          },
        });


        return null;
      }

      endereco.get('cep').setErrors(null);
      return null;
    };
  }


  static dadosTSVECargoFuncao(): ValidatorFn {
    return (group: FormGroup): ValidationErrors | null => {

      if(group.get('tipoColaborador').get('id').value != 1 ){
        const controle = group.get('dadoTSVE').get('cargo');
        controle.setValidators([Validators.required])
        const controle2 = group.get('dadoTSVE').get('cboCargo').get('id');
        controle2.setValidators([Validadores.comboSelecione()])
      } else {
        const controle = group.get('dadoTSVE').get('cargo');
        controle.clearValidators();
        controle.setErrors(null);
        const controle2 = group.get('dadoTSVE').get('cboCargo').get('id');
        controle2.clearValidators();
        controle2.setErrors(null);
      }

      return null;
    }
  }

  static infoEstagioHoraDinamica(): ValidatorFn {
    return (group: FormGroup): ValidationErrors | null => {
      const controle = group.get('horarioInicio');
      const controle2 = group.get('horarioTermino');
      if(!group.get('eHorarioDinamico').value  ){

        controle.setValidators([Validators.required])
        controle2.setValidators([Validators.required])
      } else {
        controle.clearValidators();
        controle.setErrors(null);
        controle2.clearValidators();
        controle2.setErrors(null);
      }

      return null;
    }
  }

  static horarioTrabalho(): ValidatorFn {
    return (group: FormGroup): ValidationErrors | null => {
      if (
        group.controls['horarioInicioTrabalho'].value == null ||
        group.controls['horarioTerminoTrabalho'].value == null ||
        group.controls['horarioInicioTrabalho'].value == '' ||
        group.controls['horarioTerminoTrabalho'].value == ''
      )
        return null;
      const hInicio: string =
        '01/01/2000 ' + group.controls['horarioInicioTrabalho'].value;
      const hFim: string =
        '01/01/2000 ' + group.controls['horarioTerminoTrabalho'].value;

      const inicio = moment(new Date(hInicio));
      const fim = moment(new Date(hFim));

      if (inicio.isSameOrAfter(fim)) {
        group.controls['horarioInicioTrabalho'].setErrors({
          custom: {
            message: '[*] Horário de Trabalho inválido.',
          },
        });

        group.controls['horarioTerminoTrabalho'].setErrors({
          custom: {
            message: '[*] Horário de Trabalho inválido.',
          },
        });

        return null;
      }

      group.controls['horarioInicioTrabalho'].setErrors(null);
      group.controls['horarioTerminoTrabalho'].setErrors(null);

      return null;
    };
  }

}
