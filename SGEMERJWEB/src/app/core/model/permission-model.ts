import { TokenModel } from './token-model';
export class PermissionModel {
  constructor(
    public janela?: string,
    public objFunc?: string,
    public siglaFunc?: string,
    public indAutorizado?: string
  ) {}
  static fromJson(jsonData: any): PermissionModel {
    return Object.assign(new PermissionModel(), jsonData);
  }
}
