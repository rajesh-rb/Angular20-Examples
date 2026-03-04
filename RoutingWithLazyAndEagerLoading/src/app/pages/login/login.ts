import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true, // Standalone component (no NgModule)
  imports: [FormsModule], // Required for [(ngModel)] in the template
  templateUrl: './login.html', // External template file
})
export class Login {
  // Default demo credentials shown in the input boxes
  email = 'user@demo.com';
  password = '1234';

  // Used to show an error alert in the UI when login fails
  errorMessage = '';

  // Inject AuthService to perform login and Router to redirect after success
  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  // Called when user clicks the "Sign In" button
  loginNow(): void {
    // Clear old error message before attempting a fresh login
    this.errorMessage = '';

    // Try login using the entered values
    const ok = this.auth.login(this.email, this.password);

    // If login fails, show message and stop further execution
    if (!ok) {
      this.errorMessage = 'Invalid credentials. Use user@demo.com / 1234';
      return;
    }

    // If login succeeds, redirect user to Profile page (common real-world flow)
    this.router.navigateByUrl('/profile');
  }
}
