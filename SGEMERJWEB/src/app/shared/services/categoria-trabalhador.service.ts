import { Injectable, Injector } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { environment } from 'src/environments/environment';
import { CategoriaTrabalhadorModel } from './../models/categoria-trabalhador.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaTrabalhadorService extends BaseService<CategoriaTrabalhadorModel> {

  constructor(protected injector: Injector) {
    super(`${environment.baseUrl}/categoriatrabalhador`, injector, CategoriaTrabalhadorModel.fromJson);
  }
}