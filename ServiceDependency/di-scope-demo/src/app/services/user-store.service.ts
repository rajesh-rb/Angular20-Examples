import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  // In-memory list of registered users
  // Acts as a temporary data store for demo purposes
  private users: User[] = [
    {
      fullName: 'Demo User',
      email: 'demo@example.com',
      phone: '9999999999',
      userName: 'demo',
      password: 'Demo@123',
    },
  ];

  // Checks whether a given username already exists
  // Returns true if the username is already taken
  isUserNameTaken(userName: string): boolean {
    // Normalize the username by trimming spaces and converting to lowercase
    const u = userName.trim().toLowerCase();

    // Check if any stored user matches the given username
    return this.users.some((x) => x.userName.toLowerCase() === u);
  }

  // Registers a new user by adding it to the in-memory store
  register(user: User): void {
    this.users.push(user);
  }

  // Validates login credentials
  // Returns the matching User if credentials are valid, otherwise null
  validateLogin(userName: string, password: string): User | null {
    // Normalize the username for comparison
    const u = userName.trim().toLowerCase();

    // Find a user matching both username and password
    const found = this.users.find((x) => x.userName.toLowerCase() === u && x.password === password);

    // Return the user if found, otherwise return null
    return found ?? null;
  }
}
