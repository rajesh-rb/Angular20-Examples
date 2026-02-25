// Import Component decorator to define a standalone Angular component
import { Component } from '@angular/core';

// Import CommonModule for common directives like *ngIf, *ngFor, etc.
import { CommonModule } from '@angular/common';

// Import FormsModule for template-driven forms and two-way binding
import { FormsModule } from '@angular/forms';

// Import Router services for navigation and router links
import { Router, RouterLink } from '@angular/router';

// Import UsersStoreService to manage registered users (root-scoped service)
import { UserStoreService } from '../services/user-store.service';

// Import RegistrationService to manage temporary registration draft data
// This service will be provided at the component level
import { RegistrationService } from '../services/registration.service';

// Import RegistrationModel which represents registration form data
import { RegistrationModel } from '../models/registration.model';

// Import User model representing a registered user
import { User } from '../models/user.model';

@Component({
  // Selector used to render this component
  selector: 'app-register',

  // Standalone component (no NgModule required)
  standalone: true,

  // Import required Angular modules and directives
  imports: [CommonModule, FormsModule, RouterLink],

  // External HTML template for the registration page
  templateUrl: './register.html',

  // Provide RegistrationService at component scope
  // A new instance is created for each Register component
  providers: [RegistrationService],
})
export class Register {
  // Holds the registration form model
  // Initialized in the constructor after RegistrationService is available
  model!: RegistrationModel;

  // Holds validation or business error messages
  error = '';

  // Holds success message after successful registration
  success = '';

  // Inject required services using Angular Dependency Injection
  constructor(
    private usersStore: UserStoreService, // Root-scoped user store service
    private router: Router, // Angular Router for navigation
    private draft: RegistrationService, // Component-scoped registration draft service
  ) {
    // Initialize the form model from the component-scoped draft service
    this.model = this.draft.get();
  }

  // Handles registration form submission
  submit(): void {
    // Clear previous messages
    this.error = '';
    this.success = '';

    // Basic validation checks
    if (!this.model.fullName.trim()) return this.setError('Full Name is required.');
    if (!this.model.email.trim()) return this.setError('Email is required.');
    if (!this.model.phone.trim()) return this.setError('Phone is required.');
    if (!this.model.userName.trim()) return this.setError('Username is required.');
    if (!this.model.password.trim()) return this.setError('Password is required.');

    // Check password confirmation
    if (this.model.password !== this.model.confirmPassword) {
      return this.setError('Password and Confirm Password must match.');
    }

    // Check if username already exists
    if (this.usersStore.isUserNameTaken(this.model.userName)) {
      return this.setError('This username is already taken.');
    }

    // Create a User object from the validated registration model
    const user: User = {
      fullName: this.model.fullName.trim(),
      email: this.model.email.trim(),
      phone: this.model.phone.trim(),
      userName: this.model.userName.trim(),
      password: this.model.password,
    };

    // Register the user in the global user store
    this.usersStore.register(user);

    // Display success message
    this.success = 'Registration successful! Redirecting to login...';

    // Clear component-scoped registration draft data
    this.draft.reset();

    // Rebind a fresh draft model for safety
    this.model = this.draft.get();

    // Navigate to login page after a short delay
    setTimeout(() => this.router.navigateByUrl('/login'), 700);
  }

  // Clears the form and all messages
  clear(): void {
    this.draft.reset();
    this.model = this.draft.get();
    this.error = '';
    this.success = '';
  }

  // Sets an error message (helper method)
  private setError(message: string): void {
    this.error = message;
  }
}
