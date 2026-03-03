import { Routes } from '@angular/router';

// Route Guards:
// - requireLoginGuard: Blocks protected routes if user is not logged in
// - preventUnsavedChangesGuard: Prevents leaving Edit page when there are unsaved changes
import { requireLoginGuard, preventUnsavedChangesGuard } from './guards/route-guards';

// Standalone Component references
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Profile } from './pages/profile/profile';
import { EditProfile } from './pages/edit-profile/edit-profile';

export const routes: Routes = [
  {
    // Default route (Home)
    // This is the landing page when user opens: http://localhost:4200/
    path: '',
    component: Home,
  },
  {
    // Public route: Login
    // Anyone can access /login because no guard is applied here.
    // After successful login, the user can be redirected to returnUrl or Home Page or Dashboard.
    path: 'login',
    component: Login,
  },
  {
    // Protected route: Profile
    // canActivate runs BEFORE opening this page.
    // If user is logged in → allow navigation
    // If not logged in → redirect to /login (inside requireLoginGuard)
    path: 'profile',
    component: Profile,
    canActivate: [requireLoginGuard],
  },
  {
    // Protected + Safe route: Edit Profile
    //
    // 1) canActivate: user must be logged in to enter /profile/edit
    // 2) canDeactivate: before leaving this page, router checks for unsaved changes
    //    by calling preventUnsavedChangesGuard → which calls component.canLeave()
    //
    // This gives a real-time form safety behavior (prevents accidental data loss).
    path: 'profile/edit',
    component: EditProfile,
    canActivate: [requireLoginGuard],
    canDeactivate: [preventUnsavedChangesGuard],
  },
  {
    // Wildcard / fallback route
    // If the user enters an unknown URL (ex: /abcd), redirect to Home.
    path: '**',
    redirectTo: '',
  },
];
