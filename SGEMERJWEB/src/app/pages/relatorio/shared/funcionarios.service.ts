import { HttpHeaders } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseService } from 'src/app/shared/services/base.service';
import { environment } from 'src/environments/environment';
import { FuncionariosModel } from './funcionarios.model';

@Injectable({
  providedIn: 'root'
})
export class FuncionariosService extends BaseService<FuncionariosModel> {

  queryParams: {};

  constructor(protected injector: Injector) {
    super(`${environment.baseUrl}/relfuncionariosativos`, injector, FuncionariosModel.fromJson);
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8'
    }),
    params: {}
  };

  ObterDadosFuncionariosAtivos(tipo: string, dataInicio: string, dataFim: string): Observable<any> {
    const url = `${this.apiPath}/${tipo}/${dataInicio}/${dataFim}`;
    return this.http.get(url).pipe(map(this.jsonDataToModel.bind(this)), catchError(this.handleError));
  }

  downloadPdfExcel(tipo: string, dataInicio?: string, dataFim?: string, tipoArquivo?: string): Observable<any> {
    const url = `${this.apiPath}/ExportarPdfExcel`;
    this.httpOptions.params = { tipo, dataInicio, dataFim, tipoArquivo };
    return this.http.post(url, this.httpOptions.params, { headers: this.httpOptions.headers });
  }

}
