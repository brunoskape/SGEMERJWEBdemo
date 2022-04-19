import { Injectable, Injector } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { environment } from 'src/environments/environment';
import { EstadoCivilModel } from '../models/estadocivil.model';


@Injectable({
  providedIn: 'root'
})
export class EstadoCivilService extends BaseService<EstadoCivilModel> {

  constructor(protected injector: Injector) {
    super(`${environment.baseUrl}/estadocivil`, injector, EstadoCivilModel.fromJson);
  }
}