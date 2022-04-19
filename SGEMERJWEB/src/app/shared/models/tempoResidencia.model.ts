import { BaseModel } from 'src/app/shared/models/base.model';


export class TempoResidenciaModel extends BaseModel {
    constructor(
        public descricao?: string) {
        super()
    }

    static fromJson(jsonData: any): TempoResidenciaModel {
        return Object.assign(new TempoResidenciaModel, jsonData)
    }
}