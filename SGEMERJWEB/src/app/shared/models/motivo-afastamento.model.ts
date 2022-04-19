import { BaseModel } from 'src/app/shared/models/base.model';

export class MotivoAfastamentoModel extends BaseModel {
  constructor(public descricao?: string) {
    super();
  }

  get idDescricaoText(): string {
    if (this.id > 0) 
        return this.id.toString().padStart(2, '0')  + ' - ' + this.descricao;
    else 
        return this.descricao;
  }

  static fromJson(jsonData: any): MotivoAfastamentoModel {
    return Object.assign(new MotivoAfastamentoModel(), jsonData);
  }
}
