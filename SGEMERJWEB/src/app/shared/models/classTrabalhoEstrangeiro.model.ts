import { BaseModel } from 'src/app/shared/models/base.model';


export class ClassTrabalhoEstrangeiroModel extends BaseModel {
    constructor(
        public descricao?: string) {
        super()
    }

    static fromJson(jsonData: any): ClassTrabalhoEstrangeiroModel {
        return Object.assign(new ClassTrabalhoEstrangeiroModel, jsonData)
    }
}