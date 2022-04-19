import { BaseModel } from 'src/app/shared/models/base.model';

export class ClassificacaoDeficienciasModel extends BaseModel {
    constructor(
        public descricao?: string ) {
        super()
    }

    static fromJson(jsonData: any): ClassificacaoDeficienciasModel {
        return Object.assign(new ClassificacaoDeficienciasModel, jsonData)
    }
}