import { BaseModel } from 'src/app/shared/models/base.model';


export class UnidadePagamentoModel extends BaseModel {
    constructor(
        public descricao?: string) {
        super()
    }

    static fromJson(jsonData: any): UnidadePagamentoModel {
        return Object.assign(new UnidadePagamentoModel, jsonData)
    }
}