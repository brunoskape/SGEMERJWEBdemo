import { BaseModel } from 'src/app/shared/models/base.model';

export class MotivoRescisaoModel extends BaseModel {
  constructor(public descricao?: string) {
    super();
  }

  get idDescricaoText(): string {
    if (this.id > 0) 
        return this.id.toString().padStart(2, '0')  + ' - ' + this.descricao;
    else 
        return this.descricao;
  }

  static fromJson(jsonData: any): MotivoRescisaoModel {
    return Object.assign(new MotivoRescisaoModel(), jsonData);
  }
}
