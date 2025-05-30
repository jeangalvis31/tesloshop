import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../interfaces/products.interface';
import { SlicePipe } from '@angular/common';
import { ProductImagePipe } from '../../pipes/product-image.pipe';

@Component({
  selector: 'product-card',
  imports: [RouterLink,SlicePipe, ProductImagePipe],
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent { 

  product = input.required<Product>();
}
