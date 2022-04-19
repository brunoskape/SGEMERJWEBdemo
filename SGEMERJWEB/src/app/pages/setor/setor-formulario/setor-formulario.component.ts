import { Component, Injector } from '@angular/core';
import { BaseFormComponent } from 'src/app/shared/components/base-form/base-form.component';
import { SetorModel } from '../shared/setor.model';
import { SetorService } from '../shared/setor.service';
import { Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-setor-formulario',
  templateUrl: './setor-formulario.component.html',
  styleUrls: ['./setor-formulario.component.css']
})
export class SetorFormularioComponent extends BaseFormComponent<SetorModel> {

  constructor(protected setorService: SetorService,
    protected injector: Injector,
    protected toastr: ToastrService
  ) {
    super(injector, new SetorModel, setorService, SetorModel.fromJson, toastr)
  }

  //método reescrito da base  
  protected buildForm() {
    this.modelForm = this.formBuilder.group({
      id: [null],
      sigla: [null, [Validators.required, Validators.maxLength(8)]],
      descricao: [null, [Validators.required]],
      ativo: [true]
    });
  }

  protected creationPageTitle(): string {
    return "Cadastro de Novo Setor";
  }

  protected editionPageTitle(): string {
    const titulo = this.model.sigla || "";
    return "Editando Setor: " + titulo;
  }

  public clear(): void {
    this.modelForm.patchValue({
      sigla: null,
      descricao: null,
      ativo: true
    });
  }
}
