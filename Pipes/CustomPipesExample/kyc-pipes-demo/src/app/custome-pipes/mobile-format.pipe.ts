import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    // Pipe name used in the template:
    // Example: {{ mobile | mobileFormat }}
    // Example with parameter: {{ mobile | mobileFormat:'+91' }}
    name: 'mobileFormat',

    // Standalone pipe (Angular 15+):
    // Import it directly inside a standalone component’s `imports: []`
    // (No need to declare it in an NgModule.)
    standalone: true,

    // Pure pipe:
    // Runs only when the input value (mobile number) or arguments (countryCode) change.
    // This improves performance compared to impure pipes.
    pure: true
})
export class MobileFormatPipe implements PipeTransform {

    // transform() is called automatically by Angular when you use the pipe in the template.
    // Parameters:
    // - value       : the input mobile number as typed/stored (may contain spaces, +91, hyphens, etc.)
    // - countryCode : optional parameter (default is '+91')
    //
    // Goal:
    // Convert a raw 10-digit number into a readable format:
    // 9876543210  -> +91 98765 43210
    transform(value: string | null | undefined, countryCode = '+91'): string {

        // Safety check:
        // If the value is null/undefined/empty, return an empty string.
        if (!value) return '';

        // Normalize the value:
        // Remove everything that is NOT a digit.
        // \D means "non-digit characters"
        // Example:
        // "+91 98765-43210" -> "919876543210"
        // "98765 43210"     -> "9876543210"
        const digitsOnly = value.replace(/\D+/g, '');

        // Validation check:
        // We want exactly a 10-digit mobile number (Indian format).
        // If it’s not 10 digits, we should NOT force formatting,
        // because it may be incomplete or an international number.
        //
        // Returning the original value keeps UI honest and avoids wrong formatting.
        if (digitsOnly.length !== 10) return value;

        // Format into a readable layout:
        // Break the 10 digits into 5 + 5 format:
        // First 5 digits: digitsOnly.slice(0, 5)
        // Last 5 digits : digitsOnly.slice(5)
        //
        // Final output example:
        // +91 98765 43210
        return `${countryCode} ${digitsOnly.slice(0, 5)} ${digitsOnly.slice(5)}`;
    }
}
