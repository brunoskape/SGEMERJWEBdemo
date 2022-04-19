import { Injectable, Injector } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { environment } from 'src/environments/environment';
import { CadastramentoInicialModel } from './../models/cadastramento-inicial.model';

@Injectable({
  providedIn: 'root'
})
export class CadastramentoInicialService extends BaseService<CadastramentoInicialModel> {

  constructor(protected injector: Injector) {
    super(`${environment.baseUrl}/cadastramentoinicial`, injector, CadastramentoInicialModel.fromJson);
  }
}