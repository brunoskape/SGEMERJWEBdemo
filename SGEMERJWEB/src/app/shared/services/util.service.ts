import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private spinner: NgxSpinnerService) 
  {   
  }

  public showLoading(display: boolean = true) {
    if (display) {
      this.spinner.show();
    } else {
      this.spinner.hide();
    }
  }

}