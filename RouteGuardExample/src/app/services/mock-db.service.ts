import { Injectable } from '@angular/core';
import { UserRecord } from '../models/app.model';

@Injectable({
  // Singleton service (one shared instance across the whole app).
  // Any service/component can inject this and read/update the same in-memory data.
  providedIn: 'root',
})
export class MockDbService {
  // Single in-memory data source for the application.
  // Think of this as a single "Users" table in a database that stores:
  // - Login/Auth fields: email, password, role
  // - Profile fields: fullName, phone, city, bio
  private readonly users: UserRecord[] = [
    {
      id: 1,
      email: 'amit@example.com',
      password: 'Amit@123',
      role: 'user',
      fullName: 'Amit Kumar',
      phone: '9876543210',
      city: 'Bhubaneswar',
      bio: 'Learning Angular step-by-step and building real projects.',
    },
    {
      id: 2,
      email: 'priya@example.com',
      password: 'Priya@123',
      role: 'admin',
      fullName: 'Priya Sharma',
      phone: '9123456780',
      city: 'Cuttack',
      bio: 'Admin user. Interested in dashboards and analytics.',
    },
  ];

  // Find a user record by email.
  // Used mainly by AuthService during login:
  // - user enters email + password
  // - AuthService calls this method to locate the user record
  // - then compares the password (demo)
  //
  // Returns:
  // - UserRecord if found
  // - null if not found
  getUserByEmail(email: string): UserRecord | null {
    // Make the email comparison case-insensitive for better UX
    return this.users.find((u) => u.email.toLowerCase() === email.toLowerCase()) ?? null;
  }

  // Find a user record by id.
  // Used mainly by ProfileService:
  // - Profile page needs to load profile using logged-in user id
  // - Edit page needs to fetch/update profile for that user id
  //
  // Returns:
  // - UserRecord if found
  // - null if not found
  getUserById(id: number): UserRecord | null {
    return this.users.find((u) => u.id === id) ?? null;
  }

  // Update an existing user record.
  // Used mainly by ProfileService when user clicks "Save" on Edit Profile page.
  //
  // Why we return boolean:
  // - true  => update succeeded
  // - false => user record not found (nothing updated)
  updateUser(updated: UserRecord): boolean {
    // Find the index of the existing record
    const index = this.users.findIndex((u) => u.id === updated.id);

    // If no record exists for the id, update cannot happen
    if (index === -1) return false;

    // Replace the old record with the updated one (store a copy)
    this.users[index] = { ...updated };

    return true;
  }
}
