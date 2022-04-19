import { CBOCargoModel } from '../models/cbo-cargo.model';
import { Injectable, Injector } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { environment } from 'src/environments/environment';
import { EsocialEventoModel } from '../models/esocial-evento.model';

@Injectable({
  providedIn: 'root'
})
export class EsocialEventoService extends BaseService<EsocialEventoModel> {

  constructor(protected injector: Injector) {
    super(`${environment.baseUrl}/esocialevento`, injector, EsocialEventoModel.fromJson);
  }
}