import { Component, inject, signal } from '@angular/core';
import { ProductTableComponent } from "./components/product-table/product-table.component";
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductsService } from '../../../products/services/products.service';
import { PaginationService } from '../../../shared/components/pagination/pagination.service';
import { PaginationComponent } from "../../../shared/components/pagination/pagination.component";

@Component({
  selector: 'app-products-admin-page',
  imports: [ProductTableComponent, PaginationComponent],
  templateUrl: './products-admin-page.component.html',
})
export class ProductsAdminPageComponent {
  productServide = inject(ProductsService);
  paginationService = inject(PaginationService);
  productPerPage = signal(10);



  changeLimit(limit: number) {
  this.paginationService.setCurrentPage(1);
  this.productPerPage.set(limit);
  }

  productsResource = rxResource({
    request: () => ({
      page: this.paginationService.currenPage() - 1,
      limit: this.productPerPage(),
    }),
    loader: ({ request }) => {
      return this.productServide.getProducts({
        offset: request.page * 9,
        limit: request.limit
      });
    }
  })
}
