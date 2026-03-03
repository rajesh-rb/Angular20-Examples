import { Injectable } from '@angular/core';
import { AuthUser, LoginRequest, LoginResponse } from '../models/app.model';
import { MockDbService } from './mock-db.service';

@Injectable({
  // Makes AuthService a singleton service available across the app.
  // All components/guards will use the same login state.
  providedIn: 'root',
})
export class AuthService {
  // Inject our single in-memory data source (acts like a database for demo).
  // AuthService reads user records from here to validate login credentials.
  constructor(private db: MockDbService) {}

  // Holds the currently logged-in user *in memory*.
  // Important note for learners:
  // - If the browser is refreshed, this value resets to null (user becomes logged out).
  private _currentUser: AuthUser | null = null;

  // Returns the currently logged-in user's basic identity information.
  // Used by UI:
  // - Navbar: display "Welcome, <name>"
  // - Profile page: use user.id to load profile data
  // Used by guards/logic:
  // - check role for authorization later (admin vs user)
  currentUser(): AuthUser | null {
    return this._currentUser;
  }

  // Returns true if a user is logged in, otherwise false.
  // Used mainly by CanActivate guard:
  // - If false → block access to protected routes like /profile
  // - If true  → allow access
  isLoggedIn(): boolean {
    return this._currentUser !== null;
  }

  // Performs a demo login using LoginRequest (email + password).
  // Real-time comparison:
  // - In real apps, we call an API (POST /login) and receive a token + user info.
  // - Here, we validate against the in-memory "Users table" in MockDbService.
  login(request: LoginRequest): LoginResponse {
    // Find the user record using the email entered by the user.
    // (Email comparison is handled in MockDbService in a case-insensitive manner.)
    const record = this.db.getUserByEmail(request.email);

    // If:
    // - no record found for this email, OR
    // - password does not match (demo only),
    // then login fails.
    if (!record || record.password !== request.password) {
      return { isSuccess: false, message: 'Invalid email or password.' };
    }

    // Create AuthUser WITHOUT password.
    // After login, the app should keep only safe identity fields:
    // id, name, email, role (never password).
    const user: AuthUser = {
      id: record.id,
      fullName: record.fullName,
      email: record.email,
      role: record.role,
    };

    // Save user in memory so the app becomes "authenticated".
    // After this:
    // - CanActivate will allow protected routes
    // - UI can show user info and logout button
    this._currentUser = user;

    // Return success response for the Login UI.
    // The UI can:
    // - show a success message
    // - redirect to returnUrl (/profile etc.)
    return { isSuccess: true, message: 'Login successful.', user };
  }

  // Logs out the user by clearing the in-memory auth state.
  // After logout:
  // - isLoggedIn() becomes false
  // - CanActivate will block protected routes again
  logout(): void {
    this._currentUser = null;
  }
}
