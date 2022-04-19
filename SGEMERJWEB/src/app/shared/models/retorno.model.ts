export class RetornoModel {
    constructor(
      public totalPagina?: number,
      public totalRegistro?: number,
      public pagina?: number,
      public status?: string,
      public mensagem?: string,
      public data?: any
    ) {}
   
    static fromJson(jsonData: any): RetornoModel {
      return Object.assign(new RetornoModel(), jsonData);
    }
  }