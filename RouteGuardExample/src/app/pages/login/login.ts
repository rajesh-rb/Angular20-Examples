import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../models/app.model';

@Component({
  standalone: true,
  selector: 'app-login',

  // We are using template-driven forms with ngModel,
  // so FormsModule is required in standalone component imports.
  imports: [FormsModule],

  templateUrl: './login.html',
})
export class Login {
  // Holds the login form input values (two-way bound using ngModel in the template).
  // This matches the LoginRequest type: { email, password }
  model: LoginRequest = {
    email: '',
    password: '',
  };

  // Used to show an error alert when login fails.
  // Example: "Invalid email or password."
  errorMessage = '';

  // Informational message shown on the login page for demo guidance.
  infoMessage = 'Use dummy login credentials shown below.';

  /**
   * Constructor Injection
   * Angular creates these dependencies and provides them to this component:
   * - AuthService: to validate login credentials and set login state
   * - Router: to navigate programmatically after successful login
   * - ActivatedRoute: to read query parameters like returnUrl
   */
  constructor(
    private readonly auth: AuthService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}

  /**
   * Called when the user clicks the Login button.
   * Flow:
   * 1) Call AuthService.login() with the entered credentials
   * 2) If login fails → show error message
   * 3) If login succeeds → navigate to returnUrl (or default to /profile)
   */
  login() {
    // Clear previous error before attempting login again
    this.errorMessage = '';

    // Validate credentials against the demo data source
    const result = this.auth.login(this.model);

    // If login fails, show message and stop navigation
    if (!result.isSuccess) {
      this.errorMessage = result.message;
      return;
    }

    // Support returnUrl:
    // If user was redirected to /login from a protected page,
    // the guard passes the original URL as: /login?returnUrl=/profile/edit
    //
    // If returnUrl is not present, we redirect to /profile by default.
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') ?? '/profile';

    // Navigate user to the original requested page (or /profile)
    this.router.navigateByUrl(returnUrl);
  }
}
