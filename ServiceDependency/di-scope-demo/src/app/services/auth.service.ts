// Import Injectable decorator so Angular can manage this service via Dependency Injection
import { Injectable } from '@angular/core';

// Import LoggerService for centralized logging
import { LoggerService } from './logger.service';

// Import UsersStoreService to validate user credentials
import { UserStoreService } from './user-store.service';

// Import LoginModel which represents login input data
import { LoginModel } from '../models/login.model';

// Register this service with the root injector
// This makes AuthService a singleton shared across the application
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Stores the username of the currently logged-in user
  // Null indicates that no user is logged in
  private currentUserName: string | null = null;

  // Inject LoggerService and UsersStoreService
  // Angular resolves and provides these dependencies automatically
  constructor(
    private logger: LoggerService,
    private usersStore: UserStoreService,
  ) {}

  // Attempts to log in a user using the provided credentials
  // Returns true if login is successful, otherwise false
  login(model: LoginModel): boolean {
    // Validate credentials against the user store
    const user = this.usersStore.validateLogin(model.userName, model.password);

    // If validation fails, log a warning and stop login
    if (!user) {
      this.logger.warn('Login failed: invalid credentials.');
      return false;
    }

    // Store the logged-in user's username
    this.currentUserName = user.userName;

    // Log successful login
    this.logger.info(`Login success. User = ${user.userName}`);

    return true;
  }

  // Logs out the current user and clears session state
  logout(): void {
    this.logger.info(`Logout. User = ${this.currentUserName ?? '(none)'}`);
    this.currentUserName = null;
  }

  // Indicates whether a user is currently logged in
  isLoggedIn(): boolean {
    return this.currentUserName !== null;
  }

  // Returns the username of the logged-in user
  // Returns an empty string if no user is logged in
  getUserName(): string {
    return this.currentUserName ?? '';
  }
}
