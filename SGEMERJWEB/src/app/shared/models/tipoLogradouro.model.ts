import { BaseModel } from 'src/app/shared/models/base.model';

export class TipoLogradouroModel extends BaseModel {
    constructor(
        public descricao?: string ) {
        super()
    }

    static fromJson(jsonData: any): TipoLogradouroModel {
        return Object.assign(new TipoLogradouroModel, jsonData)
    }
}