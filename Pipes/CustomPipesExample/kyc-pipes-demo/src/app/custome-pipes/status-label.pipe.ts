/*
Backend status is often raw. UI needs friendly labels.
•	Pending => display - Under Review
•	Verified => display - Approved
•	Rejected => display - Needs Re-Upload
*/


import { Pipe, PipeTransform } from '@angular/core';
import { KycStatus } from '../models/kyc.model';

@Pipe({
    // Pipe name used in the template:
    // Example: {{ app.status | statusLabel }}
    //
    // Without this pipe, the UI would show raw backend values like:
    // Pending / Verified / Rejected
    // With this pipe, the UI shows user-friendly labels.
    name: 'statusLabel',

    // Standalone pipe (Angular 15+):
    // Import it directly in a standalone component's `imports: []`.
    standalone: true,

    // Pure pipe:
    // Runs only when the status value changes.
    // Since status is a simple string/union type, pure pipe is perfect here.
    pure: true
})
export class StatusLabelPipe implements PipeTransform {

    // transform() is called automatically when Angular sees:
    // {{ status | statusLabel }}
    //
    // Input:
    // - status: KycStatus (ex: 'Pending', 'Verified', 'Rejected')
    //
    // Output:
    // - a more user-friendly label that makes sense on dashboards
    transform(status: KycStatus): string {

        // Map internal/backend status to UI display text.
        // This keeps templates clean and avoids repeating conditions in HTML.
        switch (status) {

            // Raw value "Pending" is correct for backend,
            // but for users it's clearer to say "Under Review"
            case 'Pending':
                return 'Under Review';

            // "Verified" is backend language,
            // but "Approved" is more business-friendly in UI
            case 'Verified':
                return 'Approved';

            // "Rejected" can feel harsh or unclear,
            // so we use a more actionable message in UI
            case 'Rejected':
                return 'Needs Re-Upload';

            // Safety fallback:
            // If a new status is introduced later and not handled here,
            // we return the original status so UI still shows something
            // instead of blank/undefined.
            default:
                return status;
        }
    }
}
