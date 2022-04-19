import { Injectable, Injector } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { environment } from 'src/environments/environment';
import { ColaboradorModel } from '../../pages/colaborador/shared/colaborador.model';
import { EnderecoModel } from '../models/endereco.model';

@Injectable({
  providedIn: 'root'
})
export class CepService extends BaseService<EnderecoModel> {

  constructor(protected injector: Injector) 
  {
    super(`${environment.baseUrl}/cep`, injector, EnderecoModel.fromJson);
  }
}