import { Injectable, Injector } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { environment } from 'src/environments/environment';
import { PaisModel } from '../models/pais.model';
import { UfModel } from '../models/uf.model';

@Injectable({
  providedIn: 'root'
})
export class PaisService extends BaseService<PaisModel> {

  constructor(protected injector: Injector) {
    super(`${environment.baseUrl}/paises`, injector, PaisModel.fromJson);
  }
}