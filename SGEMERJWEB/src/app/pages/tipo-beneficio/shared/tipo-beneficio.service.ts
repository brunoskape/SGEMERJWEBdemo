import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { RetornoModel } from 'src/app/shared/models/retorno.model';
import { BaseService } from 'src/app/shared/services/base.service';
import { environment } from 'src/environments/environment';
import { TipoBeneficioModel } from './tipo-beneficio.model';

@Injectable({
  providedIn: 'root'
})
export class TipoBeneficioService extends BaseService<TipoBeneficioModel> {
  
  constructor(protected injector: Injector) {
    super(`${environment.baseUrl}/tipobeneficio`, injector, TipoBeneficioModel.fromJson);
  }

  public getSetoresAtivo(): Observable<RetornoModel> {
    const url = `${this.apiPath}/combo/ativos`;
    return this.http
      .get(url)
      .pipe(
        map(this.jsonDataToListOfModel.bind(this)),
        catchError(this.handleError)
      );
  }
}
