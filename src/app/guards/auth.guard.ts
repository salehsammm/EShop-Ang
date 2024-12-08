import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const userId = localStorage.getItem('userId');

  if (!userId) {
    router.navigate(['/authentication']);
    return false;
  }

  return true;
};
