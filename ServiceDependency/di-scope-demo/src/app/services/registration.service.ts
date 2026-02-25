// Import RegistrationModel which defines the structure of registration data
import { RegistrationModel } from '../models/registration.model';

// This service manages temporary registration form data
// It is intentionally NOT decorated with @Injectable
// and is expected to be provided at the component level
export class RegistrationService {
  // Holds the draft registration data entered by the user
  // This data exists only for the lifetime of the component
  private draft: RegistrationModel = {
    fullName: '',
    email: '',
    phone: '',
    userName: '',
    password: '',
    confirmPassword: '',
  };

  // Returns the current registration draft
  // Components use this to bind form fields via two-way binding
  get(): RegistrationModel {
    return this.draft;
  }

  // Resets the registration draft to its initial empty state
  // Typically called after successful registration or component cleanup
  reset(): void {
    this.draft = {
      fullName: '',
      email: '',
      phone: '',
      userName: '',
      password: '',
      confirmPassword: '',
    };
  }
}
