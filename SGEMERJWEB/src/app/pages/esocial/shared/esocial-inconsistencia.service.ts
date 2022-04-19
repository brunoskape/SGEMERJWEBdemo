import { Injectable, Injector } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { environment } from 'src/environments/environment';
import { EsocialInconsistenciaModel } from './esocial-inconsistencia.model';


@Injectable({
  providedIn: 'root'
})
export class EsocialInconsistenciaService extends BaseService<EsocialInconsistenciaModel> {
  
  constructor(protected injector: Injector) {
    super(`${environment.baseUrl}/esocial/inconsistencia`, injector, EsocialInconsistenciaModel.fromJson);
  }

}
