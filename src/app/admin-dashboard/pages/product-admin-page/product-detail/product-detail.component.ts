import { Component, input } from '@angular/core';
import { Product } from '../../../../products/interfaces/products.interface';
import { ProductsCarouselComponent } from "../../../../products/components/products-carousel/products-carousel.component";

@Component({
  selector: 'app-product-detail',
  imports: [ProductsCarouselComponent],
  templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent { 
  product = input.required<Product>();

  sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
}
