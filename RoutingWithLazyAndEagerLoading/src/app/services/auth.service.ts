import { Injectable } from '@angular/core';

// Defines the structure of a logged-in user (used in Profile + Navbar)
export type User = {
  id: number;
  fullName: string;
  email: string;

  phone: string;
  gender: 'Male' | 'Female' | 'Other'; // fixed options for consistency
  dob: string; // yyyy-mm-dd (date of birth)
  memberSince: string; // yyyy-mm-dd (when user joined)
  lastLogin: string; // yyyy-mm-dd HH:mm (last login time)
  loyaltyPoints: number; // points earned from purchases

  // User address details grouped in one object
  address: {
    line1: string;
    line2?: string; // optional line2 (may be empty)
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Stores the current logged-in user in memory (no DB/API in this demo)
  private _currentUser: User | null = null;

  // Exposes the logged-in user to components (Profile, Orders, App navbar)
  get currentUser(): User | null {
    return this._currentUser;
  }

  // Quick flag used for UI checks and route guards
  get isLoggedIn(): boolean {
    return this._currentUser !== null;
  }

  // Validates credentials and sets the user session in memory
  login(email: string, password: string): boolean {
    // Demo login check (hardcoded)
    if (email === 'user@demo.com' && password === '1234') {
      // If credentials are valid, store the user object
      this._currentUser = {
        id: 101,
        fullName: 'Pranaya Rout',
        email: 'user@demo.com',

        phone: '+91 98765 43210',
        gender: 'Male',
        dob: '1993-08-12',
        memberSince: '2024-04-01',
        lastLogin: '2026-02-17 10:25',
        loyaltyPoints: 1280,

        address: {
          line1: 'Plot No. 21, Saheed Nagar',
          line2: 'Near Central Park',
          city: 'Bhubaneswar',
          state: 'Odisha',
          pincode: '751007',
          country: 'India',
        },
      };

      return true; // login success
    }

    return false; // login failed
  }

  // Clears the user session (logout)
  logout(): void {
    this._currentUser = null;
  }
}
