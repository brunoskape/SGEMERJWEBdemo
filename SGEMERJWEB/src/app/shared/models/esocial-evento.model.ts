import { BaseModel } from 'src/app/shared/models/base.model';

export class EsocialEventoModel extends BaseModel {
    constructor(
        public descricao?: string) {
        super()
    }

    static fromJson(jsonData: any): EsocialEventoModel {
        return Object.assign(new EsocialEventoModel, jsonData)
    }
}