import { BaseModel } from 'src/app/shared/models/base.model';

export class ReciboEsocialModel extends BaseModel {
    constructor(
        public evento?: string,
        public descricao?: string) {
        super()
    }

    get idDescricaoText(): string {
            return this.evento  + ' | ' + this.descricao;

      }

    static fromJson(jsonData: any): ReciboEsocialModel {
        return Object.assign(new ReciboEsocialModel, jsonData)
    }
}