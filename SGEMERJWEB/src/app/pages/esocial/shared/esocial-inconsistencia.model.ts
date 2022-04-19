import { BaseModel } from 'src/app/shared/models/base.model';

export class EsocialInconsistenciaModel extends BaseModel {
    constructor(
        public idComunicador?: number,
        public referencia?: string,
        public campo?: string,
        public valor?: string,
        public mensagem?: string,
        public dataEnvio?: string,
        public aceito?: string
        ) {

            
        super()
    }

    static fromJson(jsonData: any): EsocialInconsistenciaModel {
        return Object.assign(new EsocialInconsistenciaModel, jsonData)
    }
}