import { BaseModel } from 'src/app/shared/models/base.model';
import { ClassificacaoDeficienciasModel } from './classificacao-deficiencias.model';

export class DeficienciaModel extends BaseModel {
    constructor(
        public classificacaoDeficiencias?: ClassificacaoDeficienciasModel[] ) {
        super()
    }

    static fromJson(jsonData: any): DeficienciaModel {
        return Object.assign(new DeficienciaModel, jsonData)
    }
}