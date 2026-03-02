// Imports the bootstrapApplication function,
// which is responsible for starting (bootstrapping)
// a standalone Angular application in the browser
import { bootstrapApplication } from '@angular/platform-browser';

// Imports the global application configuration (providers, routing, error handling, etc.)
import { appConfig } from './app/app.config';

// Imports the root component of the application
// This is the first component Angular creates and renders
import { App } from './app/app';

// Bootstraps (starts) the Angular application
// This is the entry point of the Angular application.
// Angular starts running from this file.
// - App        → Root component of the application
// - appConfig  → Global configuration (routing, providers)
bootstrapApplication(App, appConfig)
  // Global error handling during application startup
  // Catches errors that occur while bootstrapping the app,
  // such as:
  // - Dependency injection failures
  // - Configuration issues
  // - Runtime errors during initialization
  //
  // Logging the error helps with debugging and diagnostics.
  .catch((err) => console.error(err));
