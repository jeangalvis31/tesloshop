import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../products/services/products.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductsCarouselComponent } from "../../../products/components/products-carousel/products-carousel.component";

@Component({
  selector: 'app-product-page',
  imports: [ProductsCarouselComponent],
  templateUrl: './product-page.component.html',
})
export class ProductPageComponent {

  activatedRoute = inject(ActivatedRoute)
  productService = inject(ProductsService)

  productIdSlug: string = this.activatedRoute.snapshot.params['idSlug']

  productResource = rxResource({
    request: () => ({idSlug: this.productIdSlug}),
    loader: ({request}) => {
      return this.productService.getProductsByIdSlug(request.idSlug)
    }
  })
 }
