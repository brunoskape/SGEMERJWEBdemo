import { CBOCargoModel } from '../models/cbo-cargo.model';
import { Injectable, Injector } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { environment } from 'src/environments/environment';
import { NaturezaEstagioModel } from '../models/natureza-estagio.model';
import { ReciboEsocialModel } from '../models/recibo-esocial.model';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { RetornoModel } from '../models/retorno.model';

@Injectable({
  providedIn: 'root'
})
export class ReciboEsocialService extends BaseService<ReciboEsocialModel> {

  constructor(protected injector: Injector) {
    super(`${environment.baseUrl}/recibosEsocial`, injector, ReciboEsocialModel.fromJson);
  }

  getAllById(idColaborador:number): Observable<RetornoModel> {
    const url = `${this.apiPath}/${idColaborador}`;
    return this.http
      .get(url)
      .pipe(
        map(this.jsonDataToListOfModel.bind(this)),
        catchError(this.handleError)
      );
  }
}