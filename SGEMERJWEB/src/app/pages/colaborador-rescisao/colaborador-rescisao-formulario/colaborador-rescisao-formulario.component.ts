import { Component, Injector } from '@angular/core';
import { BaseFormComponent } from 'src/app/shared/components/base-form/base-form.component';
import { RescisaoModel } from '../shared/rescisao.model';
import { RescisaoService } from '../shared/rescisao.service';
import { Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ColaboradorService } from '../../colaborador/shared/colaborador.service';
import { ColaboradorModel } from '../../colaborador/shared/colaborador.model';
import { Validadores } from 'src/app/shared/validator/custom.validator';
import { switchMap } from 'rxjs/operators';
import { ComboService } from 'src/app/shared/services/combos.service';
import { ValidadoresColaboradorRescisao } from '../shared/validator/custom.validator';

@Component({
  selector: 'app-colaborador-rescisao-formulario',
  templateUrl: './colaborador-rescisao-formulario.component.html',
  styleUrls: ['./colaborador-rescisao-formulario.component.css']
})
export class ColaboradorRescisaoFormularioComponent extends BaseFormComponent<ColaboradorModel> {

  public tituloRescisao: string;

  constructor(protected recisaoService: RescisaoService,
    protected injector: Injector,
    protected toastr: ToastrService,
    public comboService: ComboService
  ) {
    super(injector, new ColaboradorModel, recisaoService, ColaboradorModel.fromJson, toastr)
  }

  //método reescrito da base  
  protected buildForm() {
    this.modelForm = this.formBuilder.group({
      id: [null],
      idDoTipo: [null, [Validators.required]],
      nome: [null],
      cpf: [null],
      cpfNovo: [null],
      protocolo: [null, [Validadores.tamanhoMinimo(23)]],
      dadoTSVE: this.formBuilder.group({
        matricula: [null]
      }),
      tipoColaborador: this.formBuilder.group({
        id: [0 ],
      }),
      rescisao: this.formBuilder.group({
        id: [0],
        dataTermino: [null, [Validators.required, Validadores.data()]],
        dataFimQuarentena: [null,[Validadores.data()]],
        numeroProcessoTrabalhista: [null ],
        indGuia: [false ],
        motivoRescisao: this.formBuilder.group({
          id: [0 ],
        }),
        ativo: [true]
      },
      {
        validators: [
          ValidadoresColaboradorRescisao.datasRescisao()
        ],
      }
      )
    },
    
    );
  }

  protected setCurrentAction() {
    if (this.route.snapshot.url[2].path == 'novo') {
      this.currentAction = 'novo';
    } else {
      this.currentAction = 'alteracao';
    }
  }


  protected creationPageTitle(): string {
    return "Rescisão - Cadastro";
  }

  protected editionPageTitle(): string {
    return 'Rescisão - Edição';
  }

  protected load() {
    this.serverErrorMessages = null;
      this.showLoading();
      this.route.paramMap
        .pipe(switchMap((params) => this.service.getById(+params.get('id'))))
        .subscribe(
          (model) => {
            this.model = model.data;
            this.modelForm.patchValue(this.model); //seta os valores do objeto no formulário (id, name, description)
            this.loadDataAfterBuildForm();
            this.showLoading(false);
          },
          (error) => {
            this.showLoading(false);
            this.toastr.error('Erro no servidor. Tente mais tarde.');
          }
        );
  }
}
