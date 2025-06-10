import { Component, effect, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { ProductsService } from '../../../products/services/products.service';
import { ProductDetailComponent } from "./product-detail/product-detail.component";

@Component({
  selector: 'app-product-admin-page',
  imports: [ProductDetailComponent],
  templateUrl: './product-admin-page.component.html',
})
export class ProductAdminPageComponent { 
  activateRoute = inject(ActivatedRoute);
  productService = inject(ProductsService);
  router = inject(Router);

  productId = toSignal(
    this.activateRoute.params.pipe(map((params) => params['id']))
  )

productResource = rxResource({
  request: () => ({id : this.productId()}),
  loader: ({request}) => {
    return this.productService.getProductsById(request.id)
  }
})

redirectEffect = effect(() => {
  if(this.productResource.error()){
    this.router.navigate(['/admin/products']);
  }
})
}
