import { inject } from '@angular/core';
import type { CanMatchFn, Route, UrlSegment } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { firstValueFrom } from 'rxjs';

export const isAdminGuard: CanMatchFn = async (
    route: Route,
    segments: UrlSegment[]
) => {
   const authService = inject(AuthService)

   await firstValueFrom(authService.checkStatus())

   return authService.isAdmin();
}
