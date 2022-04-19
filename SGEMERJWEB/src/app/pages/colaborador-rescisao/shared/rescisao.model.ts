

import { BaseModel } from 'src/app/shared/models/base.model';
import { MotivoRescisaoModel } from 'src/app/shared/models/motivo-rescisao.model';
import { UfModel } from '../../../shared/models/uf.model';
import { ColaboradorModel } from '../../colaborador/shared/colaborador.model';


export class RescisaoModel extends BaseModel {
    constructor(
        public dataTermino?: Date,
        public motivoRescisao?: MotivoRescisaoModel,
        public numeroProcessoTrabalhista?: string,
        public dataFimQuarentena?: Date,
        public ativo?: boolean,
        public indGuia?: boolean,
        ) {
        super()
    }

    static fromJson(jsonData: any): RescisaoModel {
        return Object.assign(new RescisaoModel, jsonData)
    }
}