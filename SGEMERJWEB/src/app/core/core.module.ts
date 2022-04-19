import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import {
  faAdjust,
  faAngleDoubleDown,
  faAngleDoubleRight,
  faArrowCircleLeft,
  faArrowCircleRight,
  faCaretDown,
  faCheck,
  faCheckCircle,
  faCircleNotch,
  faCopy,
  faEdit,
  faEraser,
  faHome,
  faInfo,
  faPlus,
  faSearch,
  faSignOutAlt,
  faSort,
  faUser,
  faToggleOn,
  faToggleOff,
  faSave,
  faBackward,
  faArrowLeft,
  faTable,
  faMap,
  faGlobe,
  faTrash,
  faAddressBook,
  faWindowClose,
  faTimesCircle,
  faCamera,
  faSquare,
  faShareSquare,
  faShare,
  faExclamationTriangle,
  faUserEdit,
  faFileAlt,
  faUsers,
  faPrint,
  faDownload
} from '@fortawesome/free-solid-svg-icons';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import { AutoContrasteDirectiveModule } from '../shared/directives/autocontraste.directive';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { MenuItemComponent } from './components/menu/menu-item/menu-item.component';
import { MenuComponent } from './components/menu/menu.component';
import { NaoEncontradoComponent } from './components/nao-encontrado/nao-encontrado.component';
import { TokenApiInterceptor } from './interceptor/token-api.interceptor';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { ModalDialogModule } from 'ngx-modal-dialog';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AcessoNegadoComponent } from './components/acesso-negado/acesso-negado.component';

const maskConfig: Partial<IConfig> = {
  validation: false,
  showMaskTyped: false,
};

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    MenuComponent,
    MenuItemComponent,
    NaoEncontradoComponent,
    AcessoNegadoComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-custom',
      preventDuplicates: true,
      closeButton:true,
      enableHtml: true,
      progressBar: true,
      timeOut: 5000,
    }),
    FontAwesomeModule,
    NgxPaginationModule,
    AutoContrasteDirectiveModule,
    NgxMaskModule.forRoot(maskConfig),
    //https://github.com/Greentube/ngx-modal
    ModalDialogModule.forRoot(),
    NgxSpinnerModule
  ],
  exports: [
    HeaderComponent,
    HomeComponent,
    MenuComponent,
    MenuItemComponent,
    NaoEncontradoComponent,
    NgxSpinnerModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenApiInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {
  constructor(library: FaIconLibrary) {
    // Add an icon to the library for convenient access in other components
    //library.addIconPacks(fas);
    library.addIcons(
      faCheckCircle,
      faSort,
      faEdit,
      faSearch,
      faPlus,
      faEraser,
      faArrowCircleLeft,
      faArrowCircleRight,
      faCheckCircle,
      faSort,
      faEdit,
      faSearch,
      faAdjust,
      faCircleNotch,
      faUser,
      faSignOutAlt,
      faInfo,
      faHome,
      faCopy,
      faCaretDown,
      faAngleDoubleRight,
      faAngleDoubleDown,
      faCheck,
      faToggleOn,
      faToggleOff,
      faSave,
      faArrowLeft,
      faTable,
      faGlobe,
      faTrash,
      faAddressBook,
      faWindowClose,
      faTimesCircle,
      faCamera,
      faShareSquare,
      faShare,
      faExclamationTriangle,
      faUserEdit,
      faSignOutAlt,
      faFileAlt,
      faUsers,
      faPrint,
      faDownload
    );
  }
}
