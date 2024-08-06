import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const checkItemGuard: CanActivateFn = () => {
  const router = inject(Router);

  const itemExists = true;

  if (!itemExists) {
    router.navigate(['/not-found']);
    return false;
  }
  return true;
};
