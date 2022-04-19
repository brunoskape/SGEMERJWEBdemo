import { Injector } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { BaseModel } from '../models/base.model';
import { RetornoModel } from '../models/retorno.model';

export abstract class BaseService<T extends BaseModel> {
  protected http: HttpClient;
  constructor(
    protected apiPath: string,
    protected injector: Injector,
    protected jsonDataToModelFn: (jsonData: any) => T
  ) {
    this.http = injector.get(HttpClient);
  }

  getAll(): Observable<RetornoModel> {
    return this.http
      .get(this.apiPath)
      .pipe(
        map(this.jsonDataToListOfModel.bind(this)),
        catchError(this.handleError)
      );
  }
  getByFilter(params: HttpParams): Observable<RetornoModel> {
    return this.http
      .get(this.apiPath, { params: params })
      .pipe(
        map(this.jsonDataToListOfModel.bind(this)),
        catchError(this.handleError)
      );
  }
  getById(id: number): Observable<RetornoModel> {
    const url = `${this.apiPath}/${id}`;
    return this.http
      .get(url)
      .pipe(map(this.jsonDataToModel.bind(this)), catchError(this.handleError));
  }
  create(resource: T): Observable<RetornoModel> {
    return this.http
      .post(this.apiPath, resource)
      .pipe(map(this.jsonDataToModel.bind(this)), catchError(this.handleError));
  }
  update(resource: T): Observable<RetornoModel> {
    return this.http
      .put(this.apiPath, resource)
      .pipe(map(this.jsonDataToModel.bind(this)), catchError(this.handleError));
  }
  delete(id: number): Observable<RetornoModel> {
    const url = `${this.apiPath}/${id}`;
    return this.http.delete(url).pipe(
      map(() => null),
      catchError(this.handleError)
    );
  }
  // metodos protegidos
  protected jsonDataToListOfModel(jsonData: any): any {
    const retorno = RetornoModel.fromJson(jsonData);
    if (retorno.data != null) {
      const resources: T[] = [];
      jsonData.data.forEach((element: any) =>
        resources.push(this.jsonDataToModelFn(element))
      );
      retorno.data = resources;
    }
    return retorno;
  }
  protected jsonDataToModel(jsonData: any): any {
    const retorno = RetornoModel.fromJson(jsonData);
    if (retorno.data != null) {
    retorno.data = this.jsonDataToModelFn(jsonData.data);
    }
    return retorno;
  }
  protected handleError(error: any): Observable<any> {
    return throwError(error);
  }
}
