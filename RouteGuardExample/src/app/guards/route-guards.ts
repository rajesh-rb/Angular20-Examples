import { inject } from '@angular/core';
import { CanActivateFn, CanDeactivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * CanActivate Guard
 *
 * Purpose:
 * - Protects routes that should be accessible ONLY after login.
 *
 * Example:
 * - User tries to open /profile directly in the browser.
 * - If not logged in, we redirect to /login.
 * - After successful login, we can navigate back using returnUrl.
 */

// route: contains metadata about the route being opened (path, params, data, etc.)
// state: contains info about the navigation attempt, especially the target URL (state.url)
export const requireLoginGuard: CanActivateFn = (route, state) => {
  // Get AuthService instance using Angular DI
  // We use it to check whether the user is logged in or not.
  const auth = inject(AuthService);

  // Get Router instance to perform redirection.
  // We return a UrlTree to tell Angular Router: "redirect to this route".
  const router = inject(Router);

  //  show what "route" and "state" contain
  console.log('CanActivate route path:', route.routeConfig?.path);
  console.log('CanActivate route params:', route.params); // e.g. { id: '10' } for /product/10
  console.log('CanActivate route queryParams:', route.queryParams); // e.g. ?tab=orders
  console.log('CanActivate route data:', route.data); // custom static data in route config
  console.log('Navigation target URL (state.url):', state.url); // full URL user is trying to open

  // If the user is logged in, allow navigation to the requested route.
  if (auth.isLoggedIn()) return true;

  // If the user is NOT logged in:
  // Instead of opening the protected page, redirect to /login.
  //
  // We also preserve the requested URL (state.url) as returnUrl.
  // This helps provide a real-time experience:
  // - After login, we can navigate the user back to the original page.
  return router.createUrlTree(['/login'], {
    queryParams: { returnUrl: state.url },
  });
};

/**
 * Contract (interface) for pages that want CanDeactivate protection.
 * Any component protected by CanDeactivate must implement this interface.
 *
 * Meaning:
 * - The router will call canLeave() before leaving the route.
 * - If it returns true  → allow navigation away
 * - If it returns false → block navigation (stay on the page)
 */
export interface CanLeavePage {
  canLeave: () => boolean;
}

/**
 * CanDeactivate Guard
 * Purpose:
 * - Prevents accidental data loss when leaving a page (like Edit Profile).
 *
 * How it works:
 * - Router calls this guard when the user tries to navigate away.
 * - We delegate the decision to the current component by calling component.canLeave().
 */
export const preventUnsavedChangesGuard: CanDeactivateFn<CanLeavePage> = (component) => {
  // Component decides whether navigation can continue.
  // Typically, the component checks if there are unsaved changes.
  return component.canLeave();
};
