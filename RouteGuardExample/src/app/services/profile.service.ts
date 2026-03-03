import { Injectable } from '@angular/core';
import { UserProfile } from '../models/app.model';
import { MockDbService } from './mock-db.service';

@Injectable({
  // Makes ProfileService a singleton (one shared instance across the app).
  // Any component can inject it (Profile page, Edit Profile page, etc.).
  providedIn: 'root',
})
export class ProfileService {
  // Constructor Injection
  // Angular creates MockDbService once and injects the same instance here.
  // This ensures ProfileService reads/updates the SAME shared user data source.
  constructor(private db: MockDbService) {}

  /**
   * Fetch Profile Data for a specific user.
   *
   * Who calls this?
   * - Profile Component: to display the logged-in user's profile information
   * - EditProfile Component: to load current values into the edit form
   *
   * Why userId?
   * - userId comes from AuthUser.id (logged-in identity)
   * - We use it to pick the correct user record from our single data source
   *
   * Returns:
   * - UserProfile object (if found)
   * - null (if user record does not exist)
   */
  getProfileByUserId(userId: number): UserProfile | null {
    // Read the user record from our single "Users table" (MockDbService)
    const record = this.db.getUserById(userId);

    // If the user record doesn't exist, profile cannot be loaded
    if (!record) return null;

    // Convert (map) the full UserRecord into UserProfile.
    // We return ONLY profile-related fields here, not auth fields like password/role.
    return {
      userId: record.id, // links back to AuthUser.id
      fullName: record.fullName, // shown on Profile page and editable in Edit page
      phone: record.phone, // shown on Profile page and editable in Edit page
      city: record.city, // shown on Profile page and editable in Edit page
      bio: record.bio, // about section shown/edited by user
    };
  }

  /**
   * Update Profile Data for a specific user.
   *
   * Who calls this?
   * - EditProfileComponent when the user clicks "Save"
   *
   * What does it do?
   * - Finds the existing user record in MockDbService
   * - Updates ONLY the profile fields (fullName, phone, city, bio)
   * - Keeps auth fields (email, password, role) unchanged
   *
   * Returns:
   * - { isSuccess: true } when update succeeded
   * - { isSuccess: false } when record was not found or update failed
   */
  updateProfile(updated: UserProfile): { isSuccess: boolean; message: string } {
    // Fetch the existing record first (we must update the correct user)
    const record = this.db.getUserById(updated.userId);

    // If user record does not exist, we cannot update profile
    if (!record) {
      return { isSuccess: false, message: 'Profile not found.' };
    }

    // Create a new updated record by copying existing data
    // and overwriting ONLY profile-related fields.
    //
    // This protects auth fields from accidental overwrite.
    const updatedRecord = {
      ...record, // keeps email, password, role, etc.
      fullName: updated.fullName, // update profile field
      phone: updated.phone, // update profile field
      city: updated.city, // update profile field
      bio: updated.bio, // update profile field
    };

    // Save updated record back into our single data source
    const ok = this.db.updateUser(updatedRecord);

    // If updateUser returned false, something went wrong
    // (usually record not found — but we already checked, so it's a safe guard)
    if (!ok) {
      return { isSuccess: false, message: 'Update failed.' };
    }

    // Return success so the UI can show a green message
    return { isSuccess: true, message: 'Profile updated successfully.' };
  }
}
