import { Injectable, Injector } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { environment } from 'src/environments/environment';
import { TipoColaboradorModel } from './tipoColaborador.model';

@Injectable({
  providedIn: 'root'
})
export class TipoColaboradorService extends BaseService<TipoColaboradorModel> {

  constructor(protected injector: Injector) 
  {
    super(`${environment.baseUrl}/tipocolaborador`, injector, TipoColaboradorModel.fromJson);
  }
}