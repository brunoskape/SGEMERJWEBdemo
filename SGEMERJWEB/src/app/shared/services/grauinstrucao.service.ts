import { Injectable, Injector } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { environment } from 'src/environments/environment';
import { GrauInstrucaoModel } from '../models/grauinstrucao.model';
import { RacaModel } from '../models/raca.model';

@Injectable({
  providedIn: 'root'
})
export class GrauInstrucaoService extends BaseService<GrauInstrucaoModel> {

  constructor(protected injector: Injector) {
    super(`${environment.baseUrl}/grauinstrucao`, injector, GrauInstrucaoModel.fromJson);
  }
}