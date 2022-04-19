import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { RetornoModel } from 'src/app/shared/models/retorno.model';
import { BaseService } from 'src/app/shared/services/base.service';
import { environment } from 'src/environments/environment';
import { SetorModel } from './setor.model';

@Injectable({
  providedIn: 'root'
})
export class SetorService extends BaseService<SetorModel> {
  
  constructor(protected injector: Injector) {
    super(`${environment.baseUrl}/setores`, injector, SetorModel.fromJson);
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
