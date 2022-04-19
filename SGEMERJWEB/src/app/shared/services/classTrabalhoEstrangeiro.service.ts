import { Injectable, Injector } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { environment } from 'src/environments/environment';
import { ClassTrabalhoEstrangeiroModel } from '../models/classTrabalhoEstrangeiro.model';

@Injectable({
  providedIn: 'root'
})
export class ClassTrabalhoEstrangeiroService extends BaseService<ClassTrabalhoEstrangeiroModel> {

  constructor(protected injector: Injector) {
    super(`${environment.baseUrl}/classificacaoestrangeiro`, injector, ClassTrabalhoEstrangeiroModel.fromJson);
  }
}