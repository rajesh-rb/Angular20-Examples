import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
    name: 'mask',//name of the pipe
    standalone: true,

    // Pure pipe (recommended default):
    // Runs only when the *input value or arguments* change.
    // (Better performance than impure pipes, which run on every change detection.)
    pure: true,
})
export class MaskPipe implements PipeTransform {
    // transform() is the only required method for a pipe.
    // Angular calls it automatically whenever the template uses:
    //   {{ value | mask:showStart:showEnd:maskChar }}
    //
    // Parameters:
    // - value     : original text to be masked (PAN / email / phone, etc.)
    // - showStart : how many starting characters should remain visible
    // - showEnd   : how many ending characters should remain visible
    // - maskChar  : which character to use for masking (default '*')
    transform(
        value: string | null | undefined,
        showStart = 2,
        showEnd = 2,
        maskChar = '*'
    ): string {

        // Safety check:
        // If value is null/undefined/empty → return empty string
        if (!value) return '';

        // Normalize input:
        // trim() removes extra spaces so masking is consistent.
        // Example: "  ABCDE1234F " becomes "ABCDE1234F"
        const text = value.trim();

        // Edge case handling:
        // If the text is too short to mask (or start+end consumes whole string),
        // return the original text as-is.
        //
        // Example:
        // text="ABCD", showStart=2, showEnd=2 → nothing to mask → return "ABCD"
        if (text.length <= showStart + showEnd) return text;

        // Visible start portion:
        // Keep first showStart characters.
        // Example: showStart=2, "ABCDE1234F" → "AB"
        const start = text.slice(0, showStart);

        // Visible end portion:
        // Keep last showEnd characters.
        // Example: showEnd=2, "ABCDE1234F" → "4F"
        const end = text.slice(text.length - showEnd);

        // Masked middle portion:
        // Calculate how many characters must be hidden and fill with maskChar.
        // Example:
        // length=10, showStart=2, showEnd=2 → maskCount=6 → "******"
        const maskCount = text.length - (showStart + showEnd);
        const masked = maskChar.repeat(maskCount);

        // Final masked output:
        // Example: "AB" + "******" + "4F" → "AB******4F"
        return `${start}${masked}${end}`;
    }


}