import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { RetornoModel } from 'src/app/shared/models/retorno.model';
import { BaseService } from 'src/app/shared/services/base.service';
import { environment } from 'src/environments/environment';
import { ErrosEsocialModel } from './erros-esocial.model';


@Injectable({
  providedIn: 'root'
})
export class ErrosEsocialService extends BaseService<ErrosEsocialModel> {
  
  constructor(protected injector: Injector) {
    super(`${environment.baseUrl}/esocial/retornoErros/`, injector, ErrosEsocialModel.fromJson);
  }

  obterPorIdentificadorMPS(identificador: string): Observable<RetornoModel> {
    const url = `${this.apiPath}/${identificador}`;
    return this.http
      .get(url)
      .pipe(map(this.jsonDataToListOfModel.bind(this)), catchError(this.handleError));
  }
}
