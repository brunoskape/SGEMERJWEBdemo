import { FuncionariosService } from './../shared/funcionarios.service';
import { FuncionariosModel } from './../shared/funcionarios.model';
import { ComboService } from 'src/app/shared/services/combos.service';
import { TipoColaboradorService } from 'src/app/pages/colaborador/shared/tipoColaborador.service';
import { TipoColaboradorModel } from 'src/app/pages/colaborador/shared/tipoColaborador.model';
import { Component, OnInit } from '@angular/core';
import { UtilService } from './../../../shared/services/util.service';
import { ToastrService } from 'ngx-toastr';
import { HttpParams } from '@angular/common/http';
import *  as fileSaver from 'file-saver';

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.css']
})
export class FuncionariosComponent implements OnInit {

  labels: any = {
    previousLabel: 'Anterior',
    nextLabel: 'Próximo',
    screenReaderPaginationLabel: 'Paginação',
    screenReaderPageLabel: 'página',
    screenReaderCurrentLabel: `página corrente`,
  };

  tiposColaborador: TipoColaboradorModel[];
  funcionariosAtivos: FuncionariosModel[];

  filtroTipo = '0';
  filtroDataInicio = '';
  filtroDataFim = '';

  config = {
    id: 'custom',
    itemsPerPage: 10,
    currentPage: '1',
    totalItems: 27,
  };

  constructor(
    private tiposColaboradorService: TipoColaboradorService,
    private toastr: ToastrService,
    public comboService: ComboService,
    private utilService: UtilService,
    private funcionariosService: FuncionariosService
  ) { }

  ngOnInit(): void {
    this.obterComboTipoColaborador();
  }

  obterComboTipoColaborador() {
    this.utilService.showLoading();
    this.tiposColaboradorService.getAll().subscribe(
      (retorno) => {
        this.utilService.showLoading(false);
        this.tiposColaborador = retorno.data;
      },
      (error) => this.errorMessage(error)
    );
  }

  protected errorMessage(error: any) {
    this.utilService.showLoading(false);
    this.toastr.error('Ocorreu um erro ao processar a sua solicitação!');
  }

  search() {
    this.getFuncionarios();
    this.config.currentPage = '1';
  }

  onPageChange(event) {
    this.config.currentPage = event;
    this.getFuncionarios();
  }

  getFuncionarios() {
    this.utilService.showLoading();
    let params = new HttpParams();
    params = params.append('tipo', this.filtroTipo);
    params = params.append('dataInicio', this.filtroDataInicio);
    params = params.append('dataFim', this.filtroDataFim);
    params = params.append('pagina', this.config.currentPage);

    this.funcionariosService.getByFilter(params).subscribe(
      (retorno) => {
        if (retorno.data != null) {
          this.funcionariosAtivos = retorno.data;
          this.config.totalItems = retorno.totalRegistro;
        } else if (retorno.status === 'NOK') {
          this.funcionariosAtivos = [];
          this.toastr.error(retorno.mensagem);
        }

        this.utilService.showLoading(false);
      },
      (error) => this.errorMessage(error)
    );
  }

  downloadPdfExcel(tipoArquivo: string) {
    this.utilService.showLoading();

    this.funcionariosService.downloadPdfExcel(
      this.filtroTipo,
      this.filtroDataInicio,
      this.filtroDataFim,
      tipoArquivo
    )
      .subscribe(
        (res) => {
          const nameRel = 'FuncionariosAtivos_' + new Date().toLocaleDateString();
          tipoArquivo === 'pdf' ? res.filename = nameRel + '.pdf' : res.filename = nameRel + '.xls';
          const byteCharacters = atob(res.fileContents);
          const byteNumbers = new Array(byteCharacters.length);

          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }

          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], { type: `application/${tipoArquivo}` });
          fileSaver.saveAs(blob, res.filename);

          this.utilService.showLoading(false);
        },
        (error) => {
          console.log('download error:', JSON.stringify(error));
          this.utilService.showLoading(false);
        }
      );
  }

}
