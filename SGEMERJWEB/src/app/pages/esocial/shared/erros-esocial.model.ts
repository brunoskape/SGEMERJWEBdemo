import { BaseModel } from 'src/app/shared/models/base.model';

export class ErrosEsocialModel extends BaseModel {
    constructor(
        public identificador?: string,
        public codigoErro?: string,
        public mensagem?: string
        ) {
      
        super()
    }

    static fromJson(jsonData: any): ErrosEsocialModel {
        return Object.assign(new ErrosEsocialModel, jsonData)
    }
}