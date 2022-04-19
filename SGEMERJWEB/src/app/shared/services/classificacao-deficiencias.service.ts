import { Injectable, Injector } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { environment } from 'src/environments/environment';
import { ColaboradorModel } from '../../pages/colaborador/shared/colaborador.model';
import { EnderecoModel } from '../models/endereco.model';
import { ClassificacaoDeficienciasModel } from '../models/classificacao-deficiencias.model';

@Injectable({
  providedIn: 'root'
})
export class ClassificacaoDeficienciaService extends BaseService<ClassificacaoDeficienciasModel> {

  constructor(protected injector: Injector) 
  {
    super(`${environment.baseUrl}/classificacaodeficiencia`, injector, ClassificacaoDeficienciasModel.fromJson);
  }
}