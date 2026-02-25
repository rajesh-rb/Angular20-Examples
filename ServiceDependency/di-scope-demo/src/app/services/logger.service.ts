import { Injectable } from '@angular/core';

// Mark this class as a service that can be injected
// providedIn: 'root' registers the service with the root injector
// This makes LoggerService a singleton shared across the application
@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  // Logs general informational messages
  // Used for normal application flow tracking
  info(message: string): void {
    console.log(`[INFO] ${message}`);
  }

  // Logs warning messages
  // Used for non-critical issues that need attention
  warn(message: string): void {
    console.warn(`[WARN] ${message}`);
  }

  // Logs error messages
  // Optional 'err' parameter allows logging of exception details
  error(message: string, err?: unknown): void {
    console.error(`[ERROR] ${message}`, err);
  }
}
