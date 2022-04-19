import { BaseModel } from 'src/app/shared/models/base.model';

export class PaisModel extends BaseModel {
    constructor(
        public descricao?: string) {
        super()
    }

    static fromJson(jsonData: any): PaisModel {
        return Object.assign(new PaisModel, jsonData)
    }
}