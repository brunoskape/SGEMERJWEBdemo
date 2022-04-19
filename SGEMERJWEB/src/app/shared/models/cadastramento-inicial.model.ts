import { BaseModel } from 'src/app/shared/models/base.model';

export class CadastramentoInicialModel extends BaseModel {
    constructor(
        public descricao?: string) {
        super()
    }

    static fromJson(jsonData: any): CadastramentoInicialModel {
        return Object.assign(new CadastramentoInicialModel, jsonData)
    }
}