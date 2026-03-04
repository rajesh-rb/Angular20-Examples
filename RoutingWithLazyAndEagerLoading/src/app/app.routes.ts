import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Products } from './pages/products/products';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  // EAGER LOADING (Public pages)
  // Loads immediately on app start → best for first-time users
  { path: '', pathMatch: 'full', component: Home }, // Home page route: /
  { path: 'products', component: Products }, // Products page route: /products
  // Loads Login component only when /login is visited → best for rarely used pages
  { path: 'login', loadComponent: () => import('./pages/login/login').then((m) => m.Login) }, // Lazy load Login page: /login
  {
    path: 'profile',
    // Guard protects the route (only logged-in users can access)
    canActivate: [authGuard],
    // Loads Profile component only when /profile is visited
    loadComponent: () => import('./pages/profile/profile').then((m) => m.Profile),
  },
  {
    path: 'orders',
    // Guard protects the route (only logged-in users can access)
    canActivate: [authGuard],
    // Loads Orders component only when /orders is visited
    loadComponent: () => import('./pages/orders/orders').then((m) => m.Orders),
  },

  // Fallback route
  // If user enters an unknown URL, send them to Home
  { path: '**', redirectTo: '' },
];
