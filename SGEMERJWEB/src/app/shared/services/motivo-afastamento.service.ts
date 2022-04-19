import { Injectable, Injector } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { environment } from 'src/environments/environment';
import { MotivoAfastamentoModel } from './../models/motivo-afastamento.model';

@Injectable({
  providedIn: 'root'
})
export class MotivoAfastamentoService extends BaseService<MotivoAfastamentoModel> {

  constructor(protected injector: Injector) {
    super(`${environment.baseUrl}/motivoafastamento`, injector, MotivoAfastamentoModel.fromJson);
  }
}