import { Pipe, type PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

const baseUrl = environment.baseUrl;

@Pipe({
  name: 'appProductImage',
})
export class ProductImagePipe implements PipeTransform {

  transform(value: string | string[]) {
    if(typeof value == 'string'){
      return `${baseUrl}/files/product/${value}`
    }

    const image = value.at(0);

    if(!image){
      return './assets/images/no-image.jpg'
    }

    return `${baseUrl}/files/product/${image}`
  }

}
