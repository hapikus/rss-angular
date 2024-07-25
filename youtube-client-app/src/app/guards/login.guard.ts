import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { store } from '../stores/store';

export const loginGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('fakeToken');

  if (!token) {
    return true;
  }

  store.login = true;
  router.navigate(['']);
  return false;
};
