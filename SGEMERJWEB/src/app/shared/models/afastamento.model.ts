import { MotivoAfastamentoModel } from './motivo-afastamento.model';
import { BaseModel } from 'src/app/shared/models/base.model';
import { TipoDependenteModel } from './tipo-dependente.model';

export class AfastamentoModel extends BaseModel {
    constructor(
        public dataInicio?: string,
        public dataTermino?: string,
        public observacaoAfastamento?: string,
        public motivoAfastamento?: MotivoAfastamentoModel        
    ) {
        super()
    }

    static fromJson(jsonData: any): AfastamentoModel {
        return Object.assign(new AfastamentoModel, jsonData)
    }
}