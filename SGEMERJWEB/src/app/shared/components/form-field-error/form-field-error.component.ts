import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-form-field-error',
  template: `<p auto-contraste-red-destaque>{{ errorMessage }}</p> `,
  styleUrls: ['./form-field-error.component.css'],
})
export class FormFieldErrorComponent implements OnInit {
  @Input('form-control') formControl: FormControl;

  @Input('error-group') errorGroup: string = null;

  constructor() {}

  ngOnInit() {}

  public get errorMessage(): string | null {
    this.formControl['errorGroup'] = this.errorGroup;
    if (this.mustShowErrorMessage()) {
      return this.getErrorMessage();
    } else {
      return null;
    }
  }

  private mustShowErrorMessage(): boolean {
    return this.formControl.invalid && this.formControl.touched;
  }

  private getErrorMessage(): string | null {
    if (this.formControl.errors.required) {
      return '[*] Dado obrigatório.';
    } else if (this.formControl.errors.minlength) {
      const requiredLength = this.formControl.errors.minlength.requiredLength;
      return `[*] Deve ter no mínimo ${requiredLength} caracteres.`;
    } else if (this.formControl.errors.maxlength) {
      const requiredLength = this.formControl.errors.maxlength.requiredLength;
      return `[*] Deve ter no máximo ${requiredLength} caracteres.`;
    } else if (this.formControl.errors.email) {
      return '[*] E-mail inválido.';
    } else if (this.formControl.errors.tamanhoMinimo) {
      const requiredLength =
        this.formControl.errors.tamanhoMinimo.tamanhoRequerido;
      return `[*] Deve ter no mínimo ${requiredLength} caracteres.`;
    } else if (this.formControl.errors.tamanhoMaximo) {
      const requiredLength =
        this.formControl.errors.tamanhoMaximo.tamanhoRequerido;
      return `[*] Deve ter no máximo ${requiredLength} caracteres.`;
    } else if (this.formControl.errors.comboSelecione) {
      return '[*] Dado obrigatório.';
    } else if (this.formControl.errors.cpf) {
      return '[*] CPF inválido.';
    } else if (this.formControl.errors.cnpj) {
      return '[*] CNPJ inválido.';
    } else if (this.formControl.errors.data) {
      return '[*] Data inválida.';
    } else if (this.formControl.errors.custom) {
      const message = this.formControl.errors.custom.message;
      return message;
    }
  }
}
