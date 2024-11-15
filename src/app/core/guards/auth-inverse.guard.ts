import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth.service';

export const authInverseGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    const userRole = authService.getUserRole();

    if (userRole == 'CREATOR') {
      router.navigate(['/creator']);
    } else if (userRole == 'READER') {
      router.navigate(['reader']);
    }
    return false;
  }
  return true;
};
