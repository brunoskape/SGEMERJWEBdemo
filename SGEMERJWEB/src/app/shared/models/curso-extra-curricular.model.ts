import { BaseModel } from 'src/app/shared/models/base.model';

export class CursoExtraCurricularModel extends BaseModel {
    constructor(
        public descricao?: string) {
        super()
    }

    static fromJson(jsonData: any): CursoExtraCurricularModel {
        return Object.assign(new CursoExtraCurricularModel, jsonData)
    }
}