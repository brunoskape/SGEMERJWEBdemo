import { SituacaoModel } from './../models/situacao.model';
import { Injectable, Injector } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SituacaoService extends BaseService<SituacaoModel> {

  constructor(protected injector: Injector) {
    super(`${environment.baseUrl}/situacao`, injector, SituacaoModel.fromJson);
  }
}
