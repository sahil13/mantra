import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'product'
})
export class ProductPipe implements PipeTransform {

  transform(str: string, character: string): unknown {
    // return value.slice(0, 4);
    return str.replace("-", " ");
  }

}
