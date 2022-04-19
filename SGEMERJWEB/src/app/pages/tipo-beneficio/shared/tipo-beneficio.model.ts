import { BaseModel } from 'src/app/shared/models/base.model';

export class TipoBeneficioModel extends BaseModel {
    constructor(
        public descricao?: string,
        public ativo?: boolean) {
        super()
    }


    static fromJson(jsonData: any): TipoBeneficioModel {
        return Object.assign(new TipoBeneficioModel, jsonData)
    }
}