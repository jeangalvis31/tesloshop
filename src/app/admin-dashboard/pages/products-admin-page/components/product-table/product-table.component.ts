import { Component, input } from '@angular/core';
import { Product } from '../../../../../products/interfaces/products.interface';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { ProductImagePipe } from "../../../../../products/pipes/product-image.pipe";

@Component({
  selector: 'app-product-table',
  imports: [RouterLink, CurrencyPipe, ProductImagePipe],
  templateUrl: './product-table.component.html',
})
export class ProductTableComponent { 
  products = input.required<Product[]>();
  
  imprimir() {
    console.log(this.products()[0].images)
  }
  
}
