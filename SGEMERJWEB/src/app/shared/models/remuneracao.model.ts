import { BaseModel } from 'src/app/shared/models/base.model';
import { UnidadePagamentoModel } from './unidadePagamento.model';

export class RemuneracaoModel extends BaseModel {
    constructor(
        public unidadePagamento?: UnidadePagamentoModel,
        public descricao?: string,
        public salarioBase?: string) {
        super()
    }

    static fromJson(jsonData: any): RemuneracaoModel {
        return Object.assign(new RemuneracaoModel, jsonData)
    }
}