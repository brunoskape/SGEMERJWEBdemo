import { BaseModel } from 'src/app/shared/models/base.model';

export class ExperienciaProfissionalModel extends BaseModel {
    constructor(
        public ano?: number,
        public empresa?: string,
        public cargoOcupado?: string,
        public dataInicioPeriodo?: string,
        public dataFimPeriodo?: string
    ) {
        super()
    }

    static fromJson(jsonData: any): ExperienciaProfissionalModel {
        return Object.assign(new ExperienciaProfissionalModel, jsonData)
    }
}
