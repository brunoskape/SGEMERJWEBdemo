import { Component, Injector } from '@angular/core';
import { BaseFormComponent } from 'src/app/shared/components/base-form/base-form.component';
import { TipoBeneficioModel } from '../shared/tipo-beneficio.model';
import { TipoBeneficioService } from '../shared/tipo-beneficio.service';
import { Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tipo-beneficio-formulario',
  templateUrl: './tipo-beneficio-formulario.component.html',
  styleUrls: ['./tipo-beneficio-formulario.component.css']
})
export class TipoBeneficioFormularioComponent extends BaseFormComponent<TipoBeneficioModel> {

  constructor(protected tipoBeneficio: TipoBeneficioService,
    protected injector: Injector,
    protected toastr: ToastrService
  ) {
    super(injector, new TipoBeneficioModel, tipoBeneficio, TipoBeneficioModel.fromJson, toastr)
  }

  //método reescrito da base  
  protected buildForm() {
    this.modelForm = this.formBuilder.group({
      id: [null],
      descricao: [null, [Validators.required]],
      ativo: [true]
    });
  }

  protected creationPageTitle(): string {
    return "Cadastro de Novo Tipo de Benefício";
  }

  protected editionPageTitle(): string {
    const titulo = this.model.descricao || "";
    return "Editando Tipo de Benefício: " + titulo;
  }

  public clear(): void {
    this.modelForm.patchValue({
      sigla: null,
      descricao: null,
      ativo: true
    });
  }
}
