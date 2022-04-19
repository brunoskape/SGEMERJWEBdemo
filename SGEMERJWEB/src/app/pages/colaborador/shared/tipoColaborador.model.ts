import { BaseModel } from 'src/app/shared/models/base.model';

export class TipoColaboradorModel extends BaseModel {
    constructor(
        public descricao?: string ) {
        super()
    }

    static fromJson(jsonData: any): TipoColaboradorModel {
        return Object.assign(new TipoColaboradorModel, jsonData)
    }

  
}