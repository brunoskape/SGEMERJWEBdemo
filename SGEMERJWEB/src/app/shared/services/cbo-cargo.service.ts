import { CBOCargoModel } from './../models/cbo-cargo.model';
import { Injectable, Injector } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { environment } from 'src/environments/environment';
import { NaturezaEstagioModel } from '../models/natureza-estagio.model';

@Injectable({
  providedIn: 'root'
})
export class CBOCargoService extends BaseService<CBOCargoModel> {

  constructor(protected injector: Injector) {
    super(`${environment.baseUrl}/cbocargo`, injector, CBOCargoModel.fromJson);
  }
}