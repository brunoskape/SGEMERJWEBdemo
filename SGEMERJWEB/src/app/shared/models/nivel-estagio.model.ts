import { BaseModel } from 'src/app/shared/models/base.model';

export class NivelEstagioModel extends BaseModel {
    constructor(
        public descricao?: string) {
        super()
    }

    static fromJson(jsonData: any): NivelEstagioModel {
        return Object.assign(new NivelEstagioModel, jsonData)
    }
}