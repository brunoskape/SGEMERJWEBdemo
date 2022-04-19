import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot, CanActivate, CanLoad,
  Route,
  RouterStateSnapshot
} from '@angular/router';
import { AutenticacaoService } from './../services/autenticacao.service';

@Injectable({
  providedIn: 'root',
})
export class AutenticacaoGuard implements CanActivate, CanLoad {
  constructor(private service: AutenticacaoService) {}
  canActivate(
    activatedRouter: ActivatedRouteSnapshot,
    routerState: RouterStateSnapshot
  ): boolean {
    
    const urlParaVerificar = this.getUrl(activatedRouter);
    const estaAutenticado = this.estaAutenticado();
    if (!estaAutenticado) return false;
    return this.service.podeAcessarURL(urlParaVerificar);
  }

  canLoad(route: Route): boolean {    
    return this.estaAutenticado();
  }

  estaAutenticado(): boolean {
    //return true;
    this.service.tratarSessaoDoSegWeb();
    return this.service.estaAutenticadoSegWeb;
  }

  private getUrl(activatedRouter: ActivatedRouteSnapshot) {
    if (activatedRouter.parent.routeConfig != null) {
      return (
        activatedRouter.parent.routeConfig.path +
        '/' +
        activatedRouter.routeConfig.path
      );
    } else {
      return activatedRouter.routeConfig.path;
    }
  }
}
