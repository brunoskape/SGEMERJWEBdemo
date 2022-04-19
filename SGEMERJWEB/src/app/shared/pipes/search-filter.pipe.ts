import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(setores: any[], value: string, item: string ): any[] {

    if(!setores || !value){
      return setores;
      
    }
    return setores.filter( setor =>
      setor[item].toLocaleLowerCase().includes(value.toLocaleLowerCase())
    )  
  }

}
