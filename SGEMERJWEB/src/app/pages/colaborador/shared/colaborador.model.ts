import { InformacoesAcademicaModel } from '../../../shared/models/informacoes-academica.model';
import { DadoTSVEModel } from './dado-tsve.model';
import { AfastamentoModel } from 'src/app/shared/models/afastamento.model';
import { BaseModel } from 'src/app/shared/models/base.model';
import { ClassTrabalhoEstrangeiroModel } from 'src/app/shared/models/classTrabalhoEstrangeiro.model';
import { DeficienciaModel } from 'src/app/shared/models/deficiencia.model';
import { DependenteModel } from 'src/app/shared/models/dependente.model';
import { EstadoCivilModel } from 'src/app/shared/models/estadocivil.model';
import { ExperienciaProfissionalModel } from 'src/app/shared/models/experiencia-profissional.model';
import { GrauInstrucaoModel } from 'src/app/shared/models/grauinstrucao.model';
import { PaisModel } from 'src/app/shared/models/pais.model';
import { RacaModel } from 'src/app/shared/models/raca.model';
import { SexoModel } from 'src/app/shared/models/sexo.model';
import { TempoResidenciaModel } from 'src/app/shared/models/tempoResidencia.model';
import { UnidadePagamentoModel } from 'src/app/shared/models/unidadePagamento.model';
import { EnderecoModel } from '../../../shared/models/endereco.model';
import { CursoExtraCurricularModel } from './../../../shared/models/curso-extra-curricular.model';
import { TipoColaboradorModel } from './tipoColaborador.model';
import { RescisaoModel } from '../../colaborador-rescisao/shared/rescisao.model';
import { DadoEstagioModel } from './dado-estagio.model';


export class ColaboradorModel extends BaseModel {
    constructor(
        public idDoTipo?: number,
        public cpf?: string,
        public nome?: string,
        public tipoColaborador?: TipoColaboradorModel,
        public dataNascimento?: Date,
        public rg?: string,
        public raca?: RacaModel,
        public estadoCivil?: EstadoCivilModel,
        public grauInstrucao?: GrauInstrucaoModel,
        public paisNascimento?: PaisModel,
        public paisNacionalidade?: PaisModel,
        public nomeSocial?: string,
        public sexo?: SexoModel,
        public cpfAntigo?: string,
        public cpfNovo?: string,
        public dataAlteracaoCPF?: string,
        public observacaoAlteracaoCPF?: string,
        public ativo?: boolean,
        public idGed?: string,
        public fotoBase64?: string,
        public enderecos?: EnderecoModel[],
        public deficiencia?: DeficienciaModel,
        public salarioBase?: string,
        public observacaoRemuneracao?: string,
        public unidadePagamento?: UnidadePagamentoModel,
        public tempoResidencia?: TempoResidenciaModel,
        public classTrabalhoEstrangeiro?: ClassTrabalhoEstrangeiroModel,
        public dependentes?: DependenteModel[],
        public afastamentos?: AfastamentoModel[],
        public cursosExtraCurriculares?: CursoExtraCurricularModel[],
        public experienciasProfissional?: ExperienciaProfissionalModel[],
        public dadoTSVE?: DadoTSVEModel,
        public protocolo?: string,
        public rescisao?: RescisaoModel,
        public dadoEstagio?: DadoEstagioModel,
        public informacoesAcademica?: InformacoesAcademicaModel[],
        public horarioInicioTrabalho?: string,
        public horarioTerminoTrabalho?: string,
        public eHorarioDinamicoTrabalho?: boolean
        ) {

        super()
    }

    static fromJson(jsonData: any): ColaboradorModel {
        return Object.assign(new ColaboradorModel, jsonData);
    }
}
