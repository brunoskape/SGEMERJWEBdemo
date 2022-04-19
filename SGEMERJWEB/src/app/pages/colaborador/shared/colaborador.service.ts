import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { RetornoModel } from 'src/app/shared/models/retorno.model';
import { BaseService } from 'src/app/shared/services/base.service';
import { environment } from 'src/environments/environment';
import { ColaboradorModel } from './colaborador.model';

@Injectable({
  providedIn: 'root'
})
export class ColaboradorService extends BaseService<ColaboradorModel> {

  constructor(protected injector: Injector) 
  {
    super(`${environment.baseUrl}/colaboradores`, injector, ColaboradorModel.fromJson);
  }
  obterPorTipoECpf(tipo: number, cpf: string): Observable<RetornoModel> {
    const url = `${this.apiPath}/${tipo}/${cpf}`;
    return this.http
      .get(url)
      .pipe(map(this.jsonDataToModel.bind(this)), catchError(this.handleError));
  }
}