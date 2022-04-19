import { HttpParams } from '@angular/common/http';

export function createHttpParams(params: {}): HttpParams {
    let httpParams: HttpParams = new HttpParams();
    Object.keys(params).forEach(param => {
        if (params[param] || param === 'pageNumber' || param === 'pageSize') {
            httpParams = httpParams.set(param, params[param]);
        }
    });

    return httpParams;
}
