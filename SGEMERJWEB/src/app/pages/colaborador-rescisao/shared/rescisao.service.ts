import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { RetornoModel } from 'src/app/shared/models/retorno.model';
import { BaseService } from 'src/app/shared/services/base.service';
import { environment } from 'src/environments/environment';
import { ColaboradorModel } from '../../colaborador/shared/colaborador.model';
import { RescisaoModel } from './rescisao.model';

@Injectable({
  providedIn: 'root'
})
export class RescisaoService extends BaseService<ColaboradorModel> {
  
  constructor(protected injector: Injector) {
    super(`${environment.baseUrl}/rescisao`, injector, ColaboradorModel.fromJson);
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
