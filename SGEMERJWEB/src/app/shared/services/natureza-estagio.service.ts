import { Injectable, Injector } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { environment } from 'src/environments/environment';
import { NaturezaEstagioModel } from '../models/natureza-estagio.model';

@Injectable({
  providedIn: 'root'
})
export class NaturezaEstagioService extends BaseService<NaturezaEstagioModel> {

  constructor(protected injector: Injector) {
    super(`${environment.baseUrl}/naturezaestagio`, injector, NaturezaEstagioModel.fromJson);
  }
}