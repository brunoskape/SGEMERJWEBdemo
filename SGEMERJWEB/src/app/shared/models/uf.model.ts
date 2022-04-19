import { BaseModel } from 'src/app/shared/models/base.model';

export class UfModel extends BaseModel {
    constructor(
        public descricao?: string) {
        super()
    }

    static fromJson(jsonData: any): UfModel {
        return Object.assign(new UfModel, jsonData)
    }
}