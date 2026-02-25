// Import Component decorator to define an Angular component
import { Component } from '@angular/core';

// Import CommonModule for common structural directives
import { CommonModule } from '@angular/common';

// Import FormsModule for template-driven forms and two-way binding
import { FormsModule } from '@angular/forms';

// Import Router and RouterLink for navigation
import { Router, RouterLink } from '@angular/router';

// Import AuthService to handle authentication logic
import { AuthService } from '../services/auth.service';

// Import LoginModel which represents login input data
import { LoginModel } from '../models/login.model';

@Component({
  // Selector used to render this component
  selector: 'app-login',

  // Standalone component (no NgModule required)
  standalone: true,

  // Import required Angular modules and directives
  imports: [CommonModule, FormsModule, RouterLink],

  // External HTML template for the login page
  templateUrl: './login.html',
})
export class Login {
  // Holds login form data (username and password)
  model: LoginModel = { userName: '', password: '' };

  // Holds validation or login error message
  error = '';

  // Inject AuthService and Router using Angular Dependency Injection
  constructor(
    private auth: AuthService, // Root-scoped authentication service
    private router: Router, // Angular Router for navigation
  ) {}

  // Handles login form submission
  submit(): void {
    // Clear any previous error message
    this.error = '';

    // Basic validation to ensure required fields are provided
    if (!this.model.userName.trim() || !this.model.password.trim()) {
      this.error = 'Username and password are required.';
      return;
    }

    // Attempt login using AuthService
    const ok = this.auth.login(this.model);

    // If login fails, show error message
    if (!ok) {
      this.error = 'Invalid username or password.';
      return;
    }

    // Navigate to home page on successful login
    this.router.navigateByUrl('/');
  }
}
