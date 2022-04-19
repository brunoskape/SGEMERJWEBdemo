import { BaseModel } from 'src/app/shared/models/base.model';
import { CadastramentoInicialModel } from './../../../shared/models/cadastramento-inicial.model';

export class DadoTSVEModel extends BaseModel {
    constructor(
        public cadastramentoInicial?: CadastramentoInicialModel,
        public matricula?:string,
        public dataInicio?:string,
        public numeroProcesso?:string ) {
        super()
    }

    static fromJson(jsonData: any): DadoTSVEModel {
        return Object.assign(new DadoTSVEModel, jsonData)
    }

  
}