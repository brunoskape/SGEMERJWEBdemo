import { Injectable, Injector } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { environment } from 'src/environments/environment';
import { UfModel } from '../models/uf.model';

@Injectable({
  providedIn: 'root'
})
export class UfService extends BaseService<UfModel> {

  constructor(protected injector: Injector) {
    super(`${environment.baseUrl}/uf`, injector, UfModel.fromJson);
  }
}