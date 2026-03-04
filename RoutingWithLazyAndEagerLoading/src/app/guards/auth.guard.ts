import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

// Functional route guard
export const authGuard: CanActivateFn = () => {
  // Get AuthService instance (to check login status)
  const auth = inject(AuthService);

  // Get Router instance (to redirect user if not logged in)
  const router = inject(Router);

  // If user is logged in, allow navigation to the requested route
  if (auth.isLoggedIn) return true;

  // If user is NOT logged in, redirect them to Login page
  router.navigateByUrl('/login');

  // Block navigation to the protected route
  return false;
};
