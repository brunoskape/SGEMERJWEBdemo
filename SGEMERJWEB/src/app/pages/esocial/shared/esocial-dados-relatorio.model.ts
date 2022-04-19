import { BaseModel } from 'src/app/shared/models/base.model';
import { ColaboradorModel } from '../../colaborador/shared/colaborador.model';

export class EsocialDadosRelatorioModel extends BaseModel {
    constructor(
        public identificadorMPS?: string,
        public colaborador?: ColaboradorModel,
        public compentencia?: string,
        public evento?: string,
        public retornoMpsEsocial?: string,
        public reciboEsocial?: string
        ) {

            
        super()
    }

    static fromJson(jsonData: any): EsocialDadosRelatorioModel {
        return Object.assign(new EsocialDadosRelatorioModel, jsonData)
    }
}