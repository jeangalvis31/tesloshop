import { Component, input } from '@angular/core';
import { Product } from '../../../../../products/interfaces/products.interface';

@Component({
  selector: 'app-product-table',
  imports: [],
  templateUrl: './product-table.component.html',
})
export class ProductTableComponent { 
  products = input.required<Product[]>();
}
