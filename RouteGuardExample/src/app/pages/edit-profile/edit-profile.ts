import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ProfileService } from '../../services/profile.service';
import { CanLeavePage } from '../../guards/route-guards';
import { UserProfile } from '../../models/app.model';

@Component({
  standalone: true,
  selector: 'app-edit-profile',

  // FormsModule is required because we use template-driven forms with ngModel.
  // RouterLink is required because the template uses routerLink for navigation.
  imports: [FormsModule, RouterLink],

  templateUrl: './edit-profile.html',
})
export class EditProfile implements CanLeavePage {
  /**
   * Why implement CanLeavePage?
   * Because this component is protected by a CanDeactivate guard:
   *   canDeactivate: [preventUnsavedChangesGuard]
   * That guard calls: component.canLeave()
   * So, by implementing CanLeavePage interface, we guarantee this component
   * provides a canLeave() method (TypeScript safety + clear contract).
   */

  // Inject services using inject() (modern Angular DI style).
  // You can also use constructor injection if you prefer (both are valid).
  private readonly auth = inject(AuthService); // used to get logged-in user id
  private readonly profileService = inject(ProfileService); // used to load/update profile data

  // original: snapshot of profile when the page first loads (or after save)
  // Used to detect unsaved changes.
  original: UserProfile | null = null;

  // model: editable copy bound to the form inputs.
  // User edits this object through the UI using ngModel.
  model: UserProfile | null = null;

  // UI message shown after Save (success/error feedback)
  message = '';
  messageType: 'success' | 'danger' | '' = '';

  ngOnInit() {
    // Get current logged-in user from AuthService
    const user = this.auth.currentUser();

    // Safety check (normally CanActivate already prevents this page without login)
    if (!user) return;

    // Load profile details using the logged-in user's id
    const profile = this.profileService.getProfileByUserId(user.id);
    if (!profile) return;

    // Create a snapshot copy to detect unsaved changes.
    // We keep "original" unchanged so we can compare later.
    this.original = { ...profile };

    // Create a separate editable copy for the form.
    // The form updates this object, not the original snapshot.
    this.model = { ...profile };
  }

  /**
   * Used by CanDeactivate Guard
   * When the user tries to leave this page (back button, link click, etc.),
   * the router calls preventUnsavedChangesGuard → which calls this method.
   *
   * Return rules:
   * - true  => allow navigation away
   * - false => block navigation
   */
  canLeave(): boolean {
    // If model not loaded, allow leaving (nothing to protect)
    if (!this.model || !this.original) return true;

    // Dirty-check: compare current editable fields vs original snapshot
    const hasUnsavedChanges =
      this.model.fullName !== this.original.fullName ||
      this.model.phone !== this.original.phone ||
      this.model.city !== this.original.city ||
      this.model.bio !== this.original.bio;

    // If nothing changed, allow leaving silently
    if (!hasUnsavedChanges) return true;

    // If changes exist, ask user for confirmation.
    // If user clicks OK → true (allow leaving)
    // If user clicks Cancel → false (stay on this page)
    return confirm('You have unsaved changes. Do you really want to leave this page?');
  }

  /**
   * Save button handler
   * Flow:
   * 1) Call ProfileService.updateProfile() with the edited model
   * 2) Show success/error message on the UI
   * 3) If saved successfully, update original snapshot
   *    so further navigation won't treat it as "unsaved"
   */
  save() {
    // Safety: if form model isn't ready, do nothing
    if (!this.model) return;

    // Attempt update in the shared data source (MockDbService)
    const result = this.profileService.updateProfile(this.model);

    // If update failed, show error message and stop
    if (!result.isSuccess) {
      this.messageType = 'danger';
      this.message = result.message;
      return;
    }

    // After successful save:
    // Update the original snapshot to match the saved data.
    // This resets the dirty-check state.
    this.original = { ...this.model };

    // Show success message
    this.messageType = 'success';
    this.message = result.message;
  }
}
