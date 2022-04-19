import {
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
  FormGroup,
  FormArray,
  Validators,
} from '@angular/forms';
import * as moment from 'moment';
import { BaseValidator } from 'src/app/shared/validator/base.validator';
import { Validadores } from 'src/app/shared/validator/custom.validator';

export class ValidadoresColaboradorRescisao extends BaseValidator {
  static datasRescisao(): ValidatorFn {
    return (group: FormGroup): ValidationErrors | null => {
      if (
        group.controls['dataTermino'].value == null ||
        group.controls['dataTermino'].value == '' ||
        group.controls['dataFimQuarentena'].value == null ||
        group.controls['dataFimQuarentena'].value == ''
      ) {
        return null;
      }

      const dInicio: string = group.controls['dataTermino'].value;
      const dFim: string = group.controls['dataFimQuarentena'].value;

      if (!this.isDateValid(dInicio) || !this.isDateValid(dFim)) {
        return null;
      }

      const inicio = moment(dInicio, 'DD/MM/YYYY');
      const fim = moment(dFim, 'DD/MM/YYYY');
      const dataAtual =  moment().subtract(1, 'days');
      const dataLimite = moment().add(10, 'days');

      if (inicio.isSameOrAfter(fim)) {
        group.controls['dataTermino'].setErrors({
          custom: {
            message: '[*] Data Término não pode ser maior que Data Fim Quarentena.',
          },
        });

        group.controls['dataFimQuarentena'].setErrors({
          custom: {
            message: '[*] Data fim quarentena não pode ser maior que Data do término de contrato.',
          },
        });
        return null;
      }

      if ( inicio.isSameOrBefore(dataAtual) || inicio.isAfter(dataLimite)) {
        group.controls['dataTermino'].setErrors({
          custom: {
            message: '[*] Data Término deve ser uma data igual ou anterior à data atual acrescida de 10 (dez) dias.',
          },
        });

        return null;
      }

      group.controls['dataTermino'].setErrors(null);
      group.controls['dataFimQuarentena'].setErrors(null);

      return null;
    };
  }
}
