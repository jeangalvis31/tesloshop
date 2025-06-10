import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  private activateRoute = inject(ActivatedRoute);
  private router = inject(Router);

  currenPage = toSignal(
    this.activateRoute.queryParamMap.pipe(
      map(params => (params.get('page') ? +params.get('page')! : 1)),
      map(page => (isNaN(page) ? 1 : page))
    ),
    {
      initialValue: 1
    }
  )

    setCurrentPage(page: number) {
    this.router.navigate([], {
      relativeTo: this.activateRoute,
      queryParams: { page },
      queryParamsHandling: 'merge'
    });
  }
}
