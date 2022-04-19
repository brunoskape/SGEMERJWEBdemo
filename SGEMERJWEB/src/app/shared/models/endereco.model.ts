import { BaseModel } from 'src/app/shared/models/base.model';
import { TipoColaboradorModel } from '../../pages/colaborador/shared/tipoColaborador.model';
import { UfModel } from './uf.model';

export class EnderecoModel extends BaseModel {
    constructor(
        public cep?: string,
        public nomeLogradouro?: string,
        public numeroLogradouro?: string,
        public complemento?: string,
        public bairro?: string,
        public municipio?: string,
        public tipoLogradouro?: TipoColaboradorModel,
        public uf?: UfModel,
        public tipo?: string 
        ) {
        super()
    }

    static fromJson(jsonData: any): EnderecoModel {
        return Object.assign(new EnderecoModel, jsonData)
    }
}