import { Injectable, Injector } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { environment } from 'src/environments/environment';
import { TempoResidenciaModel } from '../models/tempoResidencia.model';

@Injectable({
  providedIn: 'root'
})
export class TempoResidenciaService extends BaseService<TempoResidenciaModel> {

  constructor(protected injector: Injector) {
    super(`${environment.baseUrl}/temporesidencia`, injector, TempoResidenciaModel.fromJson);
  }
}