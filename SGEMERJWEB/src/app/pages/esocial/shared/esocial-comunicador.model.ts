import { BaseModel } from 'src/app/shared/models/base.model';

export class EsocialComunicadorModel extends BaseModel {
    constructor(
         public id_Colaborador?: number,
         public id_Tipo_Colaborador?: number,
         public evento?: string,
         public dataCriacao?: string,
         public dataEnvio?: string,
         public status?: string,
         public nome?: string, 
         public cpf?: string,
         public codigoStatus?: number,
         public recibo?:string
        ) {
        super()
    }

    static fromJson(jsonData: any): EsocialComunicadorModel {
        return Object.assign(new EsocialComunicadorModel, jsonData)
    }
}