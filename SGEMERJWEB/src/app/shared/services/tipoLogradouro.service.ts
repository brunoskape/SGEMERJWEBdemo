import { Injectable, Injector } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { environment } from 'src/environments/environment';
import { TipoLogradouroModel } from '../models/tipoLogradouro.model';

@Injectable({
  providedIn: 'root'
})
export class TipoLogradouroService extends BaseService<TipoLogradouroModel> {

  constructor(protected injector: Injector) {
    super(`${environment.baseUrl}/tipologradouro`, injector, TipoLogradouroModel.fromJson);
  }
}