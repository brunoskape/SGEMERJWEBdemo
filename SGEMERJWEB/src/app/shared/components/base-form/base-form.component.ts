import { UtilService } from './../../services/util.service';
import {
  AfterContentChecked,
  Directive,
  Injector,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IModalDialogSettings, ModalDialogService } from 'ngx-modal-dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs/operators';
import { BaseModel } from '../../models/base.model';
import { BaseService } from '../../services/base.service';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';
import { AutoContrasteService } from '../../directives/autocontraste.directive';

@Directive()
export abstract class BaseFormComponent<T extends BaseModel>
  implements OnInit, AfterContentChecked
{
  currentAction: string;
  modelForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;
  labelEmpty: string = 'Selecione';

  protected route: ActivatedRoute;
  protected router: Router;
  protected formBuilder: FormBuilder;

  protected modalService: ModalDialogService;
  protected viewRef: ViewContainerRef;

  protected utilService: UtilService;

  protected autoContrasteService: AutoContrasteService;

  constructor(
    protected injector: Injector,
    public model: T,
    protected service: BaseService<T>,
    protected jsonDataToFn: (jsonData: any) => T,
    protected toastr: ToastrService
  ) {
    this.route = this.injector.get(ActivatedRoute);
    this.router = this.injector.get(Router);
    this.formBuilder = this.injector.get(FormBuilder);

    (this.modalService = this.injector.get(ModalDialogService)),
      (this.viewRef = this.injector.get(ViewContainerRef));

    this.utilService = this.injector.get(UtilService);
    this.autoContrasteService = this.injector.get(AutoContrasteService);
  }

  ngOnInit() {
    this.setCurrentAction();
    this.load();
    this.buildForm();
  }

  ngAfterContentChecked() {
    this.setPageTitle();
  }

  submitForm() {
    this.model = this.jsonDataToFn(this.modelForm.value);

    if (this.isValidToSubmit()) {
      this.submittingForm = true;

      if (this.currentAction == 'novo') {
        this.createModel(this.model);
      } else {
        this.updateModel(this.model);
      }
    }
  }

  //privados
  protected setCurrentAction() {
    if (this.route.snapshot.url[0].path == 'novo') {
      this.currentAction = 'novo';
    } else {
      this.currentAction = 'alteracao';
    }
  }

  protected load() {
    this.serverErrorMessages = null;
    if (this.currentAction == 'alteracao') {
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

  protected setPageTitle() {
    if (this.currentAction == 'novo') {
      this.pageTitle = this.creationPageTitle();
    } else {
      this.pageTitle = this.editionPageTitle();
    }
  }

  protected creationPageTitle(): string {
    return 'Novo';
  }

  protected editionPageTitle(): string {
    return 'Edição';
  }

  protected createModel(model: T) {
    this.showLoading();
    this.service.create(model).subscribe(
      (retorno) => this.actionsForSuccess(retorno.data),
      (error) => this.actionsForError(error)
    );
  }

  protected updateModel(model: T) {
    this.showLoading();
    this.service.update(model).subscribe(
      (retorno) => this.actionsForSuccess(retorno.data),
      (error) => this.actionsForError(error)
    );
  }

  protected actionsForSuccess(model: T) {
    this.showLoading(false);
    this.toastr.success('Solicitação processada com sucesso!!!');

    this.serverErrorMessages = null;

    const baseComponentPath: string = this.route.snapshot.parent.url[0].path;

    //recarrega o componente com o recurso criado e permite edição
    this.router
      .navigateByUrl(baseComponentPath)
      .then(() => this.router.navigate([baseComponentPath]));
  }

  protected actionsForError(error: any) {
    this.submittingForm = false;
    this.serverErrorMessages = null;

    this.showLoading(false);

    if (error.status == 400 && error.error.mensagem != null) {
      this.toastr.error(error.error.mensagem);
    } else {
        this.toastr.error('Erro ao processar solicitação.');
        this.serverErrorMessages = [
          'Falha na comunicação com o servidor. Tente mais tarde.',
          'code: ' + error.status,
        ];      
    }
  }

  protected abstract buildForm(): void;
  protected loadDataAfterBuildForm(): void {}

  public return(): void {
    const baseComponentPath: string = this.route.snapshot.parent.url[0].path;

    //retorna para o componente de listagem
    this.router.navigate([baseComponentPath]);
  }

  public clearForm(): void {
    this.buildForm();
    this.serverErrorMessages = null;
  }

  public getRandomId(): number {
    return Date.now() * Math.random();
  }

  protected isValidToSubmit(): boolean {
    const resultado = this.isFormValid(this.modelForm);
    if (resultado) return true;
    else {
      this.toastr.error('Verifique os campos');
      return false;
    }
  }

  public isFormValid(formToValid: FormGroup): boolean {
    formToValid.markAllAsTouched();
    if (formToValid.invalid) {
      return false;
    }
    return true;
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

  get classeBotaConfirmModalTrataContraste(): string {
    if (this.autoContrasteService.exibeAutoContraste)
      return 'auto-contraste-modal-Nao';
    else return 'btn btn-info';
  }

  get settingsModalTrataContraste():Partial<IModalDialogSettings>{
    let settings:Partial<IModalDialogSettings> =  {};
    if (this.autoContrasteService.exibeAutoContraste) {
      settings = {
        headerClass: 'modal-header auto-contraste-modal',
        bodyClass: 'modal-body auto-contraste-modal',
        footerClass: 'modal-footer auto-contraste-modal',
        contentClass: 'modal-content auto-contraste-modal-content-remove-clip'
      };
    }

    return settings;
  }

  protected openConfirmDialog(
    id: number,
    funcaoDeSim: (id: number) => void,
    texto: string = 'Deseja realmente remover?'
  ) {
    

    this.modalService.openDialog(this.viewRef, {
      title: 'Confirmação',
      childComponent: ModalConfirmComponent,
      data: {
        texto: texto,
      },
      settings: this.settingsModalTrataContraste,
      actionButtons: [
        {
          text: 'Sim',
          buttonClass: this.classeBotaSimModalTrataContraste,
          onAction: () => {
            funcaoDeSim(id);
            return true;
          },
        },
        {
          text: 'Não',
          buttonClass: this.classeBotaNaoModalTrataContraste,
          onAction: () => {
            return true;
          },
        },
      ],
    });
  }

  protected showLoading(display: boolean = true) {
    this.utilService.showLoading(display);
  }
}
