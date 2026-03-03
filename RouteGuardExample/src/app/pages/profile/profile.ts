import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ProfileService } from '../../services/profile.service';
import { UserProfile } from '../../models/app.model';

@Component({
  standalone: true,
  selector: 'app-profile',

  // RouterLink is required because profile.html contains routerLink
  // Example: Edit Profile button/link
  imports: [RouterLink],

  templateUrl: './profile.html',
})
export class Profile {
  // Holds the profile data that will be displayed in profile.html
  // - null means profile is not loaded or user is not logged in
  profile: UserProfile | null = null;

  /**
   * Constructor Injection
   * Angular provides these services:
   * - AuthService: to know who the logged-in user is
   * - ProfileService: to load the profile data from the single data source
   */
  constructor(
    private readonly auth: AuthService,
    private readonly profileService: ProfileService,
  ) {}

  /**
   * ngOnInit() runs AFTER Angular creates the component instance.
   * Why do we load data here instead of constructor?
   * 1) Constructor should mainly initialize the class and receive dependencies.
   * 2) ngOnInit is the correct lifecycle hook for "startup logic" like:
   *    - fetching data
   *    - preparing screen values
   *    - calling services to load data
   *
   * This is the recommended Angular practice and keeps the constructor clean.
   */
  ngOnInit() {
    // Get the currently logged-in user from AuthService
    const user = this.auth.currentUser();

    // Safety check:
    // If user is null, it means not logged in.
    // (Normally CanActivate prevents opening this page without login,
    // but this check avoids unexpected runtime errors.)
    if (!user) return;

    // Load profile details for the logged-in user using user.id
    this.profile = this.profileService.getProfileByUserId(user.id);
  }
}
