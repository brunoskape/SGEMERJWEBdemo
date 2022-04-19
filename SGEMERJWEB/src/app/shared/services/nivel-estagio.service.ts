import { Injectable, Injector } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { environment } from 'src/environments/environment';
import { NivelEstagioModel } from '../models/nivel-estagio.model';

@Injectable({
  providedIn: 'root'
})
export class NivelEstagioService extends BaseService<NivelEstagioModel> {

  constructor(protected injector: Injector) {
    super(`${environment.baseUrl}/nivelestagio`, injector, NivelEstagioModel.fromJson);
  }
}