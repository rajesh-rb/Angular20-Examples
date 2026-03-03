import { Component } from '@angular/core';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  standalone: true,

  // Since this is a standalone component, we must import the directives/components
  // that we use inside app.html.
  imports: [
    RouterOutlet, // Placeholder where routed pages will render (Home/Login/Profile/etc.)
    RouterLink, // Enables router-based navigation using [routerLink] in the template instead of anchor tag
  ],

  templateUrl: './app.html',
})
export class App {
  // Inject AuthService using constructor injection.
  // Marked as 'readonly' so it can be safely accessed in the template:
  // - @if (auth.isLoggedIn()) { ... }
  // - auth.currentUser()?.fullName
  //
  // Also, since it's injected, Angular provides the singleton instance created by DI.
  constructor(
    readonly auth: AuthService,
    private readonly router: Router,
  ) {}

  // Called when the user clicks Logout (usually from navbar button).
  // After logout:
  // - in-memory login state becomes null
  // - CanActivate guard will block protected routes again (like /profile)
  // - UI can switch back to "Login" option
  logout() {
    this.auth.logout();
    // Navigate user to the original requested page (or /profile)
    this.router.navigateByUrl('/login');
  }
}
