import { Injectable, Injector } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { environment } from 'src/environments/environment';
import { MotivoRescisaoModel } from '../models/motivo-rescisao.model';

@Injectable({
  providedIn: 'root'
})
export class MotivoRescisaoService extends BaseService<MotivoRescisaoModel> {

  constructor(protected injector: Injector) {
    super(`${environment.baseUrl}/motivorescisao`, injector, MotivoRescisaoModel.fromJson);
  }
}