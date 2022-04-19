import { Injectable, Injector } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { environment } from 'src/environments/environment';
import { TipoDependenteModel } from '../models/tipo-dependente.model';

@Injectable({
  providedIn: 'root'
})
export class TipoDependenteService extends BaseService<TipoDependenteModel> {

  constructor(protected injector: Injector) {
    super(`${environment.baseUrl}/tipodependente`, injector, TipoDependenteModel.fromJson);
  }
}