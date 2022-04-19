import { SetorFormularioComponent } from '../setor-formulario/setor-formulario.component';
import { SetorModule } from '../setor.module';
import { BaseModel } from 'src/app/shared/models/base.model';
import { UfModel } from '../../../shared/models/uf.model';

export class SetorModel extends BaseModel {
    constructor(
        public sigla?: string,
        public descricao?: string,
        public ativo?: boolean) {
        super()
    }

    get siglaDescricaoText(): string {
        if (this.sigla != undefined)
            return this.sigla + ' - ' + this.descricao;
        else
            return this.descricao;
    }

    static fromJson(jsonData: any): SetorModel {
        return Object.assign(new SetorModel, jsonData)
    }
}