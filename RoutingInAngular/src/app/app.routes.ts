import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Products } from './pages/products/products';
import { ProductDetails } from './pages/product-details/product-details';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
  // Default route (root URL)
  // When the user visits "/" (empty path), redirect them to "/home".
  { path: '', component: Home, pathMatch: 'full' },

  // Static routes (fixed URLs)
  // Visiting "/home" loads the Home component in <router-outlet>.
  { path: 'home', component: Home },

  { path: 'about', component: About },

  // Products list route
  // Visiting "/products" shows the product catalog (list page).
  // Query strings like "?category=electronics" are NOT part of the route path.
  // They are read separately using ActivatedRoute.queryParamMap.
  { path: 'products', component: Products },

  // Parameterized route (Dynamic URL)
  // Visiting "/products/101" loads ProductDetails and provides "101" as the route parameter "id".
  // The ":id" portion is a placeholder that can match any value.
  // Inside ProductDetails, we can read it using ActivatedRoute.paramMap (pm.get('id')).
  { path: 'products/:id', component: ProductDetails },

  // Wildcard route (404 handler)
  // "**" matches ANY URL that didn't match the routes above.
  // Must be placed LAST—otherwise it would catch everything and your valid routes would never load.
  { path: '**', component: NotFound },
];
