import { BaseModel } from 'src/app/shared/models/base.model';

export class FuncionariosModel extends BaseModel {
    constructor(
        public tipo?: string,
        public dataInicio?: string,
        public dataFim?: string,
        public tipoArquivo?: string
        ) {
          super();
        }

    static fromJson(jsonData: any): FuncionariosModel {
        return Object.assign(new FuncionariosModel, jsonData);
    }
}
