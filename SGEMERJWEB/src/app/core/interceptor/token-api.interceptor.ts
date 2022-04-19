import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AutenticacaoService } from '../services/autenticacao.service';

@Injectable()
export class TokenApiInterceptor implements HttpInterceptor {
  constructor(private autenticacaoService: AutenticacaoService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.autenticacaoService.ObterToken().pipe(
      switchMap((token) => {        
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });

        return next.handle(request);
      }),
    );
  }
}
