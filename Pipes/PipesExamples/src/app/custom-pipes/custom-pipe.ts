// Step 1: Import the Angular APIs required for a Pipe
// - Pipe         → decorator that tells Angular: this class is a Pipe
// - PipeTransform→ interface that forces you to implement transform()
//                (transform() is the method Angular will call from the template)
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    // Step 2: Pipe name (this is what you write after the | in HTML)
    // Example in template:  {{ value | sample }}
    name: 'custompipe',

    // Step 3: Standalone pipe (Angular 15+)
    // - You can import this pipe directly inside a standalone component’s imports: []
    // - No need to declare it in any NgModule
    standalone: true,

    // Step 4: Pure Pipe (recommended)
    // - true  (default): Runs only when input value or pipe arguments change
    // - false (impure): Runs on every change detection cycle (can hurt performance)
    pure: true,
})
export class CustomPipe implements PipeTransform {

    // Step 5: transform() is the heart of any Pipe
    //
    // Angular automatically calls transform() whenever the template uses:
    //   {{ inputValue | sample:arg1:arg2 }}
    //
    // Parameters:
    // - value  → the actual input coming from template (left side of |)
    // - ...args→ optional parameters passed after :
    //
    // Return:
    // - The final string/number/value that should be displayed in the UI
    transform(
        value: string | null | undefined, // input from template
        prefix = 'Mr.',                   // example optional argument #1
        makeUppercase = false             // example optional argument #2
    ): string {

        // Step 6: Safety check (avoid runtime errors)
        // If value is null/undefined/empty → return an empty string.
        if (!value) return '';

        // Step 7: Normalize/clean the input (optional)
        // trim() removes extra spaces so output looks consistent.
        let text = value.trim();

        // Step 8: Apply transformation logic (this is your custom formatting)
        // Example transformation: uppercase if requested
        if (makeUppercase) {
            text = text.toUpperCase();
        }

        // Step 9: Return the final formatted value
        // This is what will be shown in the HTML where the pipe is used.
        return `${prefix} ${text}`;
    }


}