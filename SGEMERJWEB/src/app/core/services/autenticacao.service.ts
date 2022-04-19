import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { throwError, Observable, from, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserModel } from '../model/user-model';
import { MenuService } from './../components/menu/menu.service';
import { TokenModel } from './../model/token-model';

@Injectable({
  providedIn: 'root',
})
export class AutenticacaoService {
  constructor(
    private router: Router,
    private menuService: MenuService,
    private httpBackend: HttpBackend,
    private spinner: NgxSpinnerService,
    private cookieService: CookieService
  ) {
    if (sessionStorage.getItem('USER') != null) {
      this.usuarioLogado = JSON.parse(sessionStorage.getItem('USER'));
      this.menuService.montarMenuEConcederPermissoes(
        this.usuarioLogado.autorizacoes
      );

      this.cookieSegWeb = sessionStorage.getItem('SEGSESSIONID');
      this.cookieOrgao = sessionStorage.getItem('SEGCODORGAO');
    }
  }

  public usuarioLogado: UserModel;
  public estaAutenticadoSegWeb: boolean = true;

  private cookieSegWeb: string = null;
  private cookieOrgao: string = null;

  tratarSessaoDoSegWeb(): void {
    var veioDoSegWeb: boolean = false;
    this.cookieSegWeb = sessionStorage.getItem('SEGSESSIONID');
    this.cookieOrgao = sessionStorage.getItem('SEGCODORGAO');

    if (this.cookieSegWeb == null || this.cookieOrgao == null) {
      
      const urlParams = new URLSearchParams(window.location.search);

      this.cookieSegWeb = urlParams.get('SEGSESSIONID') || this.cookieService.get('SEGSESSIONID');
      this.cookieOrgao = urlParams.get('SEGCODORGAO') || this.cookieService.get('SEGCODORGAO');

      veioDoSegWeb = true;      
    }

    if (this.cookieSegWeb == null || this.cookieSegWeb == '' || 
        this.cookieOrgao == null || this.cookieOrgao == '') {
      //usuário NÃO está logado no SegWeb
      this.redirecionarParaAutenticar('aa');
    } else {
      //usuário está logado no SegWeb
      this.estaAutenticadoSegWeb = true;
      if (veioDoSegWeb) {        
        this.spinner.show();
        this.estaAutenticadoSegWeb = false;
        this.ObterUsuarioComSessionID(
          this.cookieSegWeb,
          this.cookieOrgao
        ).subscribe(
          (usuario: UserModel) => {
            this.estaAutenticadoSegWeb = true;
            this.setDadosUsuarioAutenticado(usuario);
            this.menuService.montarMenuEConcederPermissoes(
              this.usuarioLogado.autorizacoes
            );
            this.spinner.hide();

            this.router.navigate(['/home']);
          },
          () => {
            this.spinner.hide();
            this.redirecionarParaAcessoNegado();
          }
        );
      }
    }
  }

  public redirecionarParaAutenticar(origem) {    
    this.estaAutenticadoSegWeb = false;    
    location.href = this.retornaUrlDoSegWebParaAutenticar();
  }
  private setDadosUsuarioAutenticado(usuario) {
    this.usuarioLogado = UserModel.fromJson(usuario);

    sessionStorage.setItem('TOKENAPI', this.usuarioLogado.token.tokenJWT);
    sessionStorage.setItem('TOKENAPIEXP', this.usuarioLogado.token.expiration);

    sessionStorage.setItem('USER', JSON.stringify(this.usuarioLogado));
    sessionStorage.setItem('SEGSESSIONID', this.cookieSegWeb);
    sessionStorage.setItem('SEGCODORGAO', this.cookieOrgao);
  }

  logout(withRedirect: boolean = true) {
    this.estaAutenticadoSegWeb = false;
    sessionStorage.clear();
    
    this.cookieService.deleteAll('/','.tjrj.jus.br')
    
    if (withRedirect) window.location.href = environment.urlDoSegWeb;
  }

  public redirecionarParaAcessoNegado() {
    this.logout(false);
    this.router.navigate(['/acesso-negado']);    
  }

  public tokenEstaVencido(): boolean {
    const tokenAcessoAPIExp = sessionStorage.getItem('TOKENAPIEXP');
    const dataAtual = moment();
    return dataAtual.isAfter(tokenAcessoAPIExp);
  }

  private retornaUrlDoSegWebParaAutenticar(): string {
    return `${environment.urlDoSegWeb}?indGet=true&SIGLASISTEMA=${environment.siglaDoSistema}&URLREFERENCIA=${environment.urlDoSistema}`;
  }

  private ObterUsuarioComSessionID(SEGSESSIONID: string, SEGCODORGAO: string) {
    const url = `${environment.baseUrl}/acesso/ObterUsuarioComSessionID/${SEGSESSIONID}/${SEGCODORGAO}`;
    const httpWithoutInterceptor = new HttpClient(this.httpBackend);

    return httpWithoutInterceptor.get(url).pipe(
      map((response) => {
        return response;
      }),
      catchError((error) => throwError(error))
    );
  }

  public ObterToken(): Observable<string> {
    if (this.tokenEstaVencido()) {
      const url = `${environment.baseUrl}/acesso/ObterToken/${this.cookieSegWeb}/${this.cookieOrgao}`;

      const httpWithoutInterceptor = new HttpClient(this.httpBackend);
      return httpWithoutInterceptor.get(url).pipe(
        map((tokenModel) => {
          const token = TokenModel.fromJson(tokenModel);
          this.usuarioLogado.token = token;
          sessionStorage.setItem('TOKENAPI', token.tokenJWT);
          sessionStorage.setItem('TOKENAPIEXP', token.expiration);

          return token.tokenJWT;
        }),
        catchError((error) => {
          this.redirecionarParaAutenticar('bb');
          return throwError(error);
        })
      );
    } else {
      const token = sessionStorage.getItem('TOKENAPI');
      return of(token);
    }
  }

  public podeAcessarURL(urlParaVerificar): boolean {
    const urlAutorizada = this.menuService.urlsAutorizadasDoUsuario.find(
      (x) => x == urlParaVerificar
    );
    if (urlAutorizada == undefined || urlAutorizada == null) {
      this.router.navigate(['/acesso-negado']);
    }
    return true;
  }
}
