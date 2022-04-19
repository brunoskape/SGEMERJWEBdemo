import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormFieldErrorComponent } from './components/form-field-error/form-field-error.component';
import { ServerErrorMessagesComponent } from './components/server-error-messages/server-error-messages.component';
import { AutoContrasteDirectiveModule } from './directives/autocontraste.directive';
import { BooleanPipe } from './pipes/boolean.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { NgxMaskModule } from 'ngx-mask';
import { ModalListaComponent } from './components/modal-lista/modal-lista.component';
import { AnoMesPipe } from './pipes/ano-mes.pipe';


@NgModule({
  declarations: [
    FormFieldErrorComponent,
    ServerErrorMessagesComponent,
    BooleanPipe,
    SearchFilterPipe,
    OrderByPipe,
    ModalListaComponent,
    AnoMesPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    NgxPaginationModule,
    FontAwesomeModule,
    AutoContrasteDirectiveModule,
    NgxMaskModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FormFieldErrorComponent,
    ServerErrorMessagesComponent,
    BooleanPipe,
    SearchFilterPipe,
    OrderByPipe,
    NgxPaginationModule,
    FontAwesomeModule,
    AutoContrasteDirectiveModule,
    NgxMaskModule,
    ModalListaComponent,
    AnoMesPipe
  ]
})
export class SharedModule {
}
