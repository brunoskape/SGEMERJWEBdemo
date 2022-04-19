import { BaseValidator } from 'src/app/shared/validator/base.validator';
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export class Validadores extends BaseValidator {
  //validador implementado para corrigir um possível bug do ngx-mask que anula os validadores minlength e maxlength quando posto em um array no buildform
  static tamanhoMinimo(value: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value == null) return null;

      const tamanhoAtual: number = control.value.toString().length;

      if (tamanhoAtual < value && tamanhoAtual > 0) {
        return {
          tamanhoMinimo: {
            tamanhoAtual: tamanhoAtual,
            tamanhoRequerido: value,
          },
        };
      }

      return null;
    };
  }
  //validador implementado para corrigir um possível bug do ngx-mask que anula os validadores minlength e maxlength quando posto em um array no buildform
  static tamanhoMaximo(value: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value == null) return null;

      const tamanhoAtual: number = control.value.toString().length;
      if (tamanhoAtual > value) {
        return {
          tamanhoMinimo: {
            tamanhoAtual: tamanhoAtual,
            tamanhoRequerido: value,
          },
        };
      }

      return null;
    };
  }

  static comboSelecione(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value == null) return null;

      const value: number = control.value.toString();

      if (value <= 0) {
        return {
          comboSelecione: {
            value: value,
          },
        };
      }

      return null;
    };
  }

  static cpf(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value == null) return null;

      const value: string = control.value.toString();

      if (!this.isCpfValid(value)) {
        return {
          cpf: {
            value: value,
          },
        };
      }

      return null;
    };
  }

  static data(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value == null || control.value == '') return null;

      const value: string = control.value.toString();
      if (!this.isDateValid(value)) {
        return {
          data: {
            value: value,
          },
        };
      }
    }
  }

  static cnpj(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value == null || control.value == '' ) return null;

      const value: string = control.value.toString();

      if (!this.isCnpjValido(value)) {

        return {
          cnpj: {
            value: value,
          },
        };
      }

      return null;
    };
  }

  static MesAno(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value == null || control.value == '') return null;

      const value: string = control.value.toString();
      if (!this.isMonthYearValid(value)) {
        return {
          data: {
            value: value,
          },
        };
      }
    }
  }

  static dadosInformacoesAcademica(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

      const valueGrauInstrucao = [8, 9, 10, 11, 12];
      const grauInstrucao = control.get('grauInstrucao').get('id');
      const curso = control.get('curso');

      if (valueGrauInstrucao.find(grauInstrucao.value) > 0) {
          curso.setErrors({
            custom: {
              message: '[*] Dado obrigatório.',
            },
          });

          return null;
      }
    };
  }

}
