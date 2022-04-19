import { PermissionModel } from './permission-model';
import { TokenModel } from './token-model';
export class UserModel {
  constructor(
    public nome?: string,
    public autorizacoes?: Array<PermissionModel>,
    public token?: TokenModel
  ) {}
  static fromJson(jsonData: any): UserModel {
    const usuario = Object.assign(new UserModel(), jsonData);

    usuario.token = TokenModel.fromJson(usuario.token);

    const autorizacoes: Array<PermissionModel> = [];
    usuario.autorizacoes.forEach((x: PermissionModel) =>
      autorizacoes.unshift(PermissionModel.fromJson(x))
    );

    usuario.autorizacoes = autorizacoes;
    return usuario;
  }
}
