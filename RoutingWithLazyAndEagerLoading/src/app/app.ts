import { Component } from '@angular/core';
import { RouterLink, RouterOutlet, Router, RouterLinkActive } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root', // Root selector used in index.html
  standalone: true, // Standalone component (no NgModule)
  imports: [
    RouterOutlet, // Required to render routed pages
    RouterLink, // Enables [routerLink] navigation in template
    RouterLinkActive, // Enables active link highlighting in navbar
  ],
  templateUrl: './app.html', // External template (you prefer no inline HTML)
})
export class App {
  // Used for footer copyright year (auto-updates every year)
  year = new Date().getFullYear();

  // auth: used in app.html to show Login button / Logout button conditionally
  // router: used to redirect user after logout
  constructor(
    public auth: AuthService,
    private router: Router,
  ) {}

  // Logout handler (called from navbar button)
  logoutNow(): void {
    this.auth.logout(); // Clear in-memory logged-in user
    this.router.navigateByUrl('/'); // Redirect to Home after logout
  }
}
