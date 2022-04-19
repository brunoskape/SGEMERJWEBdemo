import { BaseModel } from 'src/app/shared/models/base.model';
import { EnderecoModel } from 'src/app/shared/models/endereco.model';
import { NaturezaEstagioModel } from 'src/app/shared/models/natureza-estagio.model';
import { NivelEstagioModel } from 'src/app/shared/models/nivel-estagio.model';
import { CadastramentoInicialModel } from '../../../shared/models/cadastramento-inicial.model';
import { SetorModel } from '../../setor/shared/setor.model';

export class DadoEstagioModel extends BaseModel {
    constructor(
        public naturezaEstagio?: NaturezaEstagioModel,
        public nivelEstagio?:NivelEstagioModel,
        public setorEstagio?:SetorModel,
        public apoliceSeguro?:string,
        public areaAtuacao?:string,
        public dataInicio?:string,
        public dataPrevistaTermino?:string,
        public horarioInicio?:string,
        public horarioTermino?:string,
        public eHorarioDinamico?:boolean,
        public cpfSupervisor?:string,
        public nomeSupervisor?:string,      
        public cnpjInstEnsino?:string,
        public razaoSocialInstEnsino?:string,
        public enderecoInstEnsino?:EnderecoModel,
        public cnpjAgenteInt?:string,
        public razaoSocialAgenteInt?:string,
        ) {
        super()
    }

    static fromJson(jsonData: any): DadoEstagioModel {
        return Object.assign(new DadoEstagioModel, jsonData)
    }

  
}