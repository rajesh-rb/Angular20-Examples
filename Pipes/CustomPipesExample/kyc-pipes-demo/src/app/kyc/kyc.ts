
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// App-specific model types (type-safety for our form + dashboard list)
import { KycApplication, KycStatus } from '../models/kyc.model';

// Custom Pipes (standalone pipes must be imported just like directives/components)
import { MaskPipe } from '../custome-pipes/mask.pipe';
import { MobileFormatPipe } from '../custome-pipes/mobile-format.pipe';
import { StatusLabelPipe } from '../custome-pipes/status-label.pipe';

@Component({
  // Component selector used in HTML:
  // <app-kyc></app-kyc>
  selector: 'app-kyc',

  // Standalone component (Angular latest):
  // No NgModule needed. Everything used in the template must be listed in `imports`.
  standalone: true,

  // Template dependencies:
  // - FormsModule: enables [(ngModel)] for two-way binding
  // - CommonModule: enables common pipes (date/currency/number/titlecase/etc.)
  // - MaskPipe/MobileFormatPipe/StatusLabelPipe: your custom pipes used in template
  imports: [
    FormsModule,
    CommonModule,

    // Custom Pipes
    MaskPipe,
    MobileFormatPipe,
    StatusLabelPipe
  ],

  // External template file (UI stays in HTML, logic stays in TS)
  templateUrl: './kyc.html'
})
export class Kyc {

  // Form Fields (Template-driven / ngModel)
  // These properties hold the current values typed by the user.
  // Because of [(ngModel)], these values stay in sync with the UI.
  fullName = '';
  mobile = '';
  pan = '';
  email = '';

  // UI State Flag
  // Used to control WHEN validation messages / error highlights should appear.
  // Common behavior:
  // - false initially (clean UI)
  // - true after user clicks Submit (show errors if any)
  isSubmitted = false;

  // Local auto-increment ID generator (demo purpose)
  // In real apps, backend/database generates IDs.
  private nextId = 1001;

  // In-memory list of submitted applications (demo purpose)
  // After successful submit, we push a new record into this list.
  // Template uses @for to render this list like a dashboard.
  applications: KycApplication[] = [];

  // Validation Getters (Readable + reusable rules)
  // These getters return TRUE when a field is invalid.
  // Keeping validation logic here makes:
  // - submit() cleaner
  // - template cleaner
  // - rules reusable in multiple places

  // Full Name is invalid when it is empty or only spaces
  get isFullNameInvalid(): boolean {
    return this.fullName.trim().length === 0;
  }

  // Mobile is invalid when it is not exactly 10 digits
  // (If you also use digits-only directive, mobile stays numeric)
  get isMobileInvalid(): boolean {
    return this.mobile.trim().length !== 10;
  }

  // PAN is invalid when it is not exactly 10 characters
  // (If you use uppercase directive, PAN stays uppercase)
  get isPanInvalid(): boolean {
    return this.pan.trim().length !== 10;
  }

  // Email is invalid when it does not match a basic email pattern
  // This is a simple UI-level validation, not full RFC-level validation.
  get isEmailInvalid(): boolean {
    return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email.trim());
  }

  // Master flag for whole form validity
  // If ANY field is invalid, form is invalid.
  get isFormInvalid(): boolean {
    return (
      this.isFullNameInvalid ||
      this.isMobileInvalid ||
      this.isPanInvalid ||
      this.isEmailInvalid
    );
  }

  // Submit Handler
  // This method is called when user clicks "Submit KYC"
  submit(): void {

    // Step 1: mark that user attempted submission
    // UI will now show validation messages / error styles.
    this.isSubmitted = true;

    // Step 2: stop if form has any invalid field
    // We don't add anything to the dashboard unless it's valid.
    if (this.isFormInvalid) return;

    // Step 3: build a new record (same shape as KycApplication interface)
    // We store trimmed values so data remains clean and consistent.
    const newApp: KycApplication = {
      id: this.nextId++,              // demo-generated unique id
      fullName: this.fullName.trim(), // clean name
      mobile: this.mobile.trim(),     // clean mobile
      pan: this.pan.trim(),           // clean PAN
      email: this.email.trim(),       // clean email
      status: 'Pending',              // new submissions start as Pending
      createdAt: new Date()           // store submission timestamp
    };

    // Step 4: add new record at the top of the list (most recent first)
    // This is common dashboard behavior.
    this.applications = [newApp, ...this.applications];

    // Step 5: clear form fields after successful submission
    // Prepares UI for next entry.
    this.fullName = '';
    this.mobile = '';
    this.pan = '';
    this.email = '';

    // Step 6: reset UI validation state
    // Form looks fresh again for next submission.
    this.isSubmitted = false;
  }

  // UI Helper: Badge color based on status
  // Template can call this method to decide the Bootstrap badge class.
  // Keeps status-to-color mapping in one place (not repeated in HTML).
  getBadgeClass(status: KycStatus): string {
    switch (status) {
      case 'Verified': return 'bg-success';         // green
      case 'Rejected': return 'bg-danger';          // red
      case 'Pending': return 'bg-warning text-dark';// yellow
      default: return 'bg-secondary';               // gray fallback
    }
  }
}

