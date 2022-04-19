import { BaseModel } from 'src/app/shared/models/base.model';

export class NaturezaEstagioModel extends BaseModel {
    constructor(
        public sigla?: string,
        public descricao?: string) {
        super()
    }

    static fromJson(jsonData: any): NaturezaEstagioModel {
        return Object.assign(new NaturezaEstagioModel, jsonData)
    }
}