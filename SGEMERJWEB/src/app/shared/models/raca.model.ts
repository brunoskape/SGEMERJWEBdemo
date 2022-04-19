import { BaseModel } from 'src/app/shared/models/base.model';

export class RacaModel extends BaseModel {
    constructor(
        public descricao?: string) {
        super()
    }

    static fromJson(jsonData: any): RacaModel {
        return Object.assign(new RacaModel, jsonData)
    }
}