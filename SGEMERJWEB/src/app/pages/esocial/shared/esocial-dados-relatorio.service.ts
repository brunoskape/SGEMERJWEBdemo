import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { RetornoModel } from 'src/app/shared/models/retorno.model';
import { BaseService } from 'src/app/shared/services/base.service';
import { environment } from 'src/environments/environment';
import { EsocialDadosRelatorioModel } from './esocial-dados-relatorio.model';
import { EsocialComunicadorModel } from './esocial-comunicador.model';
import { EsocialInconsistenciaModel } from './esocial-inconsistencia.model';


@Injectable({
  providedIn: 'root'
})
export class EsocialDadosRelatorioService extends BaseService<EsocialDadosRelatorioModel> {
  
  constructor(protected injector: Injector) {
    super(`${environment.baseUrl}/esocial/relatorio`, injector, EsocialDadosRelatorioModel.fromJson);
  }
}
