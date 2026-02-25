// Import Component decorator to define an Angular component
import { Component } from '@angular/core';

// Import CommonModule for common structural directives and pipes
import { CommonModule } from '@angular/common';

// Import RouterLink directive for navigation
import { RouterLink } from '@angular/router';

// Import AuthService to access authentication state
import { AuthService } from '../services/auth.service';

@Component({
  // Selector used to render this component in templates
  selector: 'app-home',

  // Standalone component (does not belong to any NgModule)
  standalone: true,

  // Import required Angular modules and directives for this component
  imports: [CommonModule, RouterLink],

  // External HTML template for the component
  templateUrl: './home.html',
})
export class Home {
  // Inject AuthService using Angular Dependency Injection
  // Marked as public so it can be accessed directly in the template
  constructor(public auth: AuthService) {}
}
