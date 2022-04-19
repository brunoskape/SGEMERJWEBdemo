import { Injectable, Injector } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { environment } from 'src/environments/environment';
import { UnidadePagamentoModel } from '../models/unidadepagamento.model';

@Injectable({
  providedIn: 'root'
})
export class UnidadePagamentoService extends BaseService<UnidadePagamentoModel> {

  constructor(protected injector: Injector) {
    super(`${environment.baseUrl}/unidadepagamento`, injector, UnidadePagamentoModel.fromJson);
  }
}