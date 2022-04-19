import { BaseModel } from 'src/app/shared/models/base.model';

export class EstadoCivilModel extends BaseModel {
    constructor(
        public descricao?: string) {
        super()
    }

    static fromJson(jsonData: any): EstadoCivilModel {
        return Object.assign(new EstadoCivilModel, jsonData)
    }
}