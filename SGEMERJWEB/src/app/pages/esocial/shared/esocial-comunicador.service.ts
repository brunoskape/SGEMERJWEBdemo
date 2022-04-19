import { HttpParams } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { RetornoModel } from 'src/app/shared/models/retorno.model';
import { BaseService } from 'src/app/shared/services/base.service';
import { environment } from 'src/environments/environment';
import { EsocialComunicadorModel } from './esocial-comunicador.model';


@Injectable({
  providedIn: 'root'
})
export class EsocialComunicadorService extends BaseService<EsocialComunicadorModel> {
  
  constructor(protected injector: Injector) {
    super(`${environment.baseUrl}/esocial`, injector, EsocialComunicadorModel.fromJson);
  }

  transmitirComunicadorMps(evento: string, ids: number[]): Observable<RetornoModel> {
    const url = `${this.apiPath}/${evento}`;
    return this.http
      .post(url, ids)
      .pipe(map(this.jsonDataToModel.bind(this)), catchError(this.handleError));
  }


  existe2300Enviado(colaborador: number, tipoColaborador: number): Observable<RetornoModel> {
    const url = `${this.apiPath}/originalEnviado/${colaborador}/${tipoColaborador}`;
    return this.http
      .get(url)
      .pipe(map(this.jsonDataToModel.bind(this)), catchError(this.handleError));
  }
}
