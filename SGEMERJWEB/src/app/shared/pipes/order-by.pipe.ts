import { keyframes } from '@angular/animations';
import { Pipe, PipeTransform } from '@angular/core';
import { getValueInRange } from '@ng-bootstrap/ng-bootstrap/util/util';
import { strictEqual } from 'assert';
import { stringify } from 'querystring';

@Pipe({
    name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
    keys: string[]

    transform(list: any[], key: string, desc: boolean): any[] {

        if (!list || !key) {
            return list;

        }
        this.keys = key.split('.');

        if(desc)
            return list.sort((a, b) => (this.getValue(a,0) < this.getValue(b,0)) ? 1 : -1);
        else 
            return list.sort((a, b) => (this.getValue(a,0) > this.getValue(b,0)) ? 1 : -1);
    }

    
     getValue(obj:any, position:number): string {
       const value =  obj[this.keys[position]]  
       if (typeof value === 'object') {
        this.getValue(value, position+1); // <- recursive call
       } else {
        return value.toString().toLocaleLowerCase();
       }

    }
}