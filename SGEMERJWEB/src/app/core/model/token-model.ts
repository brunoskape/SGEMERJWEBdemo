export class TokenModel {
  constructor(public tokenJWT?: string, public expiration?: string) {}
  static fromJson(jsonData: any): TokenModel {
    return Object.assign(new TokenModel(), jsonData);
  }
}
