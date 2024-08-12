import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ItemsService } from '../services/items/items.service';

export const checkItemGuard: CanActivateFn = (route) => {
  const itemsService = inject(ItemsService);
  const router = inject(Router);

  const { id } = route.params;
  const itemExists = itemsService.getItemById(id);

  if (!itemExists) {
    router.navigate(['/not-found']);
    return false;
  }
  return true;
};
