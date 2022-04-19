import { SituacaoModel } from './situacao.model';
import { BaseModel } from 'src/app/shared/models/base.model';

export class InformacoesAcademicaModel extends BaseModel {
    constructor(
        public curso?: string,
        public situacao?: SituacaoModel,
        public previsaoConclusao?: string,
        ) {
        super();
    }

    static fromJson(jsonData: any): InformacoesAcademicaModel {
        return Object.assign(new InformacoesAcademicaModel, jsonData);
    }


}
