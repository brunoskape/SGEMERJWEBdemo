import { BaseModel } from 'src/app/shared/models/base.model';
import { TipoDependenteModel } from './tipo-dependente.model';

export class DependenteModel extends BaseModel {
    constructor(
        public nome?: string,
        public nascimento?: string,
        public cpf?: string,
        public temIRRF?: boolean,
        public temSalarioFamilia?: boolean,
        public temIncapacidadeFisicaMental?: TipoDependenteModel,
        public idDependenteAux?: number

    ) {
        super()
    }

    static fromJson(jsonData: any): DependenteModel {
        return Object.assign(new DependenteModel, jsonData)
    }
}