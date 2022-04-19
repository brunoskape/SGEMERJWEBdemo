import { BaseModel } from 'src/app/shared/models/base.model';

export class SituacaoModel extends BaseModel {
    constructor(
        public descricao?: string
    ) {
        super();
    }

    static fromJson(jsonData: any): SituacaoModel {
        return Object.assign(new SituacaoModel, jsonData);
    }
}
