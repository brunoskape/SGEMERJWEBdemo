import { BaseModel } from 'src/app/shared/models/base.model';

export class GrauInstrucaoModel extends BaseModel {
    constructor(
        public descricao?: string) {
        super()
    }

    static fromJson(jsonData: any): GrauInstrucaoModel {
        return Object.assign(new GrauInstrucaoModel, jsonData)
    }
}