import { BaseModel } from 'src/app/shared/models/base.model';

export class SexoModel extends BaseModel {
    constructor(
        public descricao?: string) {
        super()
    }

    static fromJson(jsonData: any): SexoModel {
        return Object.assign(new SexoModel, jsonData)
    }
}