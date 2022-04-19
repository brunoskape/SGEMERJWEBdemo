import { Injectable, Injector } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { environment } from 'src/environments/environment';
import { RacaModel } from '../models/raca.model';

@Injectable({
  providedIn: 'root'
})
export class RacaService extends BaseService<RacaModel> {

  constructor(protected injector: Injector) {
    super(`${environment.baseUrl}/racas`, injector, RacaModel.fromJson);
  }
}