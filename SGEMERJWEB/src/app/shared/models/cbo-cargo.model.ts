import { BaseModel } from 'src/app/shared/models/base.model';

export class CBOCargoModel extends BaseModel {
    constructor(
        public codigo?: string,
        public descricao?: string) {
        super()
    }

    get idDescricaoText(): string {
        if (this.codigo != '') 
            return this.codigo.toString().padStart(6, '0')  + ' - ' + this.descricao;
        else 
            return this.descricao;
      }

    static fromJson(jsonData: any): CBOCargoModel {
        return Object.assign(new CBOCargoModel, jsonData)
    }
}