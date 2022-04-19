import { BaseModel } from 'src/app/shared/models/base.model';

export class TipoDependenteModel extends BaseModel {
    constructor(
        public descricao?: string) {
        super()
    }

    static fromJson(jsonData: any): TipoDependenteModel {
        return Object.assign(new TipoDependenteModel, jsonData)
    }
}