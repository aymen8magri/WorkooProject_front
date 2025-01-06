import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = (route, state) => {
  const userService: UserService = inject(UserService);
  const router: Router = inject(Router);

  if (userService.isLoggedIn()) {
    router.navigate(['/client']);
    return false;
  } else {
    return true;
  }
};
