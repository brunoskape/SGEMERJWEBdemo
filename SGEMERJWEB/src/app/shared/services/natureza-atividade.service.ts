import { Injectable, Injector } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { environment } from 'src/environments/environment';
import { NaturezaAtividadeModel } from '../models/natureza-atividade.model';

@Injectable({
  providedIn: 'root'
})
export class NaturezaAtividadeService extends BaseService<NaturezaAtividadeModel> {

  constructor(protected injector: Injector) {
    super(`${environment.baseUrl}/naturezaatividade`, injector, NaturezaAtividadeModel.fromJson);
  }
}