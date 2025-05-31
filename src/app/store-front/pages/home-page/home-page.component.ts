import { Component, inject } from '@angular/core';
import { ProductCardComponent } from "../../../products/components/product-card/product-card.component";
import { ProductsService } from '../../../products/services/products.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { PaginationComponent } from "../../../shared/components/pagination/pagination.component";
import { PaginationService } from '../../../shared/components/pagination/pagination.service';


@Component({
  selector: 'app-home-page',
  imports: [ProductCardComponent, PaginationComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent { 
  productServide = inject(ProductsService);
  paginationService = inject(PaginationService);


/*   activateRoute = inject(ActivatedRoute);

  currenPage = toSignal(
    this.activateRoute.queryParamMap.pipe(
      map(params => (params.get('page') ? +params.get('page')! : 1)),
      map(page => (isNaN(page) ? 1:page))
    ),
    {
      initialValue: 1
    }
  ) */

  productsResource = rxResource({
    request: () => ({ page: this.paginationService.currenPage() -1}),
    loader: ({request}) => {
      return this.productServide.getProducts({
        offset: request.page * 9
      });
    }
  })
}
