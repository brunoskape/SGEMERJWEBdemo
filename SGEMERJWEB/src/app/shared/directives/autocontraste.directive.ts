import { element } from 'protractor';
import {
  Attribute,
  Directive,
  ElementRef,
  HostBinding,
  Injectable,
  NgModule,
} from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';

@Directive({
  selector: '[auto-contraste]',
})
export class AutoContrasteDirective {
  private subscription: Subscription;

  constructor(private el: ElementRef, private service: AutoContrasteService) {
    this.subscription = this.service.subjectContraste
      .asObservable()
      .subscribe((alterou) => {
        this.alterarElemento(this.el, alterou);
      });
  }

  ngOnInit(): void {
    this.alterarElemento(this.el, this.service.exibeAutoContraste);
  }

  private alterarElemento(elemento: ElementRef, exibeAutoContraste: boolean) {
    if (exibeAutoContraste) {
      elemento.nativeElement.style.color = 'white';
      elemento.nativeElement.style.backgroundColor = 'black';
      elemento.nativeElement.style.borderColor = 'white';
      window.document.body.style.backgroundColor = 'black';
    } else {
      elemento.nativeElement.style.color = '';
      elemento.nativeElement.style.backgroundColor = '';
      elemento.nativeElement.style.borderColor = '';
      window.document.body.style.backgroundColor = '';
    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

@Directive({
  selector: '[auto-contraste-destaque]',
})
export class AutoContrasteDestaqueDirective {
  private subscription: Subscription;

  constructor(private el: ElementRef, private service: AutoContrasteService) {
    this.subscription = this.service.subjectContraste
      .asObservable()
      .subscribe((alterou) => {
        this.alterarElemento(this.el, alterou);
      });
  }

  ngOnInit(): void {
    this.alterarElemento(this.el, this.service.exibeAutoContraste);
  }

  private alterarElemento(elemento: ElementRef, exibeAutoContraste: boolean) {
    if (exibeAutoContraste) {
      elemento.nativeElement.style.color = 'yellow';
      elemento.nativeElement.style.backgroundColor = 'black';
      elemento.nativeElement.style.borderColor = 'yellow';
      window.document.body.style.backgroundColor = 'black';
    } else {
      elemento.nativeElement.style.color = '';
      elemento.nativeElement.style.backgroundColor = '';
      elemento.nativeElement.style.borderColor = '';
      window.document.body.style.backgroundColor = '';
    }



  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

@Directive({
  selector: '[auto-contraste-red-destaque]',
})
export class AutoContrasteRedDestaqueDirective {
  private subscription: Subscription;

  constructor(private el: ElementRef, private service: AutoContrasteService) {
    this.subscription = this.service.subjectContraste
      .asObservable()
      .subscribe((alterou) => {
        this.alterarElemento(this.el, alterou);
      });
  }

  ngOnInit(): void {
    this.alterarElemento(this.el, this.service.exibeAutoContraste);
  }

  private alterarElemento(elemento: ElementRef, exibeAutoContraste: boolean) {
    if (exibeAutoContraste) {
      elemento.nativeElement.style.color = 'yellow';
      elemento.nativeElement.style.backgroundColor = 'black';
      elemento.nativeElement.style.borderColor = 'yellow';
      window.document.body.style.backgroundColor = 'black';
    } else {
      elemento.nativeElement.style.color = 'red';
      elemento.nativeElement.style.backgroundColor = '';
      elemento.nativeElement.style.borderColor = '';
      window.document.body.style.backgroundColor = '';
    }

  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
@Directive({
  selector: '[auto-contraste-fundo]',
})
export class AutoContrasteFundoDirective {
  private subscription: Subscription;

  constructor(private el: ElementRef, private service: AutoContrasteService) {
    this.subscription = this.service.subjectContraste
      .asObservable()
      .subscribe((alterou) => {
        this.alterarElemento(this.el, alterou);
      });
  }

  ngOnInit(): void {
    this.alterarElemento(this.el, this.service.exibeAutoContraste);
  }

  private alterarElemento(elemento: ElementRef, exibeAutoContraste: boolean) {
    if (exibeAutoContraste) {
      elemento.nativeElement.style.backgroundColor = 'black';
      window.document.body.style.backgroundColor = 'black';
    } else {
      elemento.nativeElement.style.backgroundColor = '';
      window.document.body.style.backgroundColor = '';
    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

@Directive({
  selector: '[altera-fonte]',
})
export class AlterarFonteDirective {
  @HostBinding('class')
  elementClass = 'altera-fonte';
  constructor() { }
}

@Injectable({
  providedIn: 'root',
})
export class AutoContrasteService {
  public exibeAutoContraste: boolean = false;

  public subjectContraste = new Subject<any>();

  constructor() { }

  public alterarAutoContraste() {
    this.exibeAutoContraste = !this.exibeAutoContraste;
    this.subjectContraste.next(this.exibeAutoContraste);
  }
}

@NgModule({
  declarations: [
    AutoContrasteDestaqueDirective,
    AutoContrasteDirective,
    AutoContrasteFundoDirective,
    AlterarFonteDirective,
  AutoContrasteRedDestaqueDirective],
  exports: [
    AutoContrasteDestaqueDirective,
    AutoContrasteDirective,
    AutoContrasteFundoDirective,
    AlterarFonteDirective,
    AutoContrasteRedDestaqueDirective]
})
export class AutoContrasteDirectiveModule { }
