import { Directive, ElementRef, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[appinputrule]',
  standalone: true,
})
export class InputDirective {
  // Input binding that accepts a rule from the template
  // Usage example:
  // <input appInputRule="digits">
  // <input appInputRule="uppercase">
  //
  // 'digits'   → allows only numeric characters
  // 'uppercase' → converts text to uppercase

  @Input() rule: 'digit' | 'uppercase' = 'digit';

  // ElementRef is injected by Angular and represents the host element on which this directive is applied.
  // In this case, the host element is an <input>, so ElementRef lets us access that input element.
  constructor(private el: ElementRef) {}

  // @HostListener('input') tells Angular:
  // Whenever the HOST element (the element where this directive is applied)
  // triggers the browser's 'input' event, call the method below.
  //
  // The 'input' event happens whenever the input's value changes, such as:
  // - user types a character
  // - user deletes (Backspace/Delete)
  // - user pastes text
  // - autocomplete / mobile keyboard changes the value
  @HostListener('input')

  // This is a normal TypeScript method.
  // Angular will automatically execute it because of @HostListener above.
  //
  // The method name 'onInput' is NOT special.
  // You could rename it to anything (e.g., handleInputChange, formatValue, etc.)
  // and it will still work as long as @HostListener is attached.
  onInput() {
    // Place your directive logic here:
    // 1) Read the current value from the host element
    // 2) Validate/format/clean the value
    // 3) Write the updated value back to the input if needed

    // Extract the actual native DOM element from ElementRef.
    // `nativeElement` is the actual HTMLInputElement in the browser.
    // Example: the exact <input> tag on which the directive is attached.
    const input = this.el.nativeElement;

    // Read the current text/value present inside the input box at this moment.
    // This includes whatever the user has typed or pasted so far.
    let value = input.value;

    // Rule 1: Digits only
    // \D matches any non-digit character
    // replace(/\D+/g, '') removes everything except numbers
    // Example: "98a7-6" -> "9876"
    if (this.rule === 'digit') {
      value = value.replace(/\D+/g, '');
    }

    // Rule 2: Uppercase
    // Convert the entire input value to uppercase characters
    // Example: "abc12d" -> "ABC12D"
    if (this.rule === 'uppercase') {
      value = value.toUpperCase();
    }

    // Only update the DOM if our formatted/cleaned value is different.
    // Why?
    // - Avoids rewriting the same value again and again.
    // - Prevents unnecessary DOM work (better performance).
    // - Helps avoid repeated event triggering in some cases.
    if (input.value !== value) {
      // Write the final cleaned/formatted value back into the input box.
      // At this point, "value" is the corrected version (digits-only, uppercase, etc.)
      // so the user immediately sees the corrected text on the screen.
      input.value = value;

      // Changing input.value programmatically does NOT automatically
      // notify Angular's change detection or form controls.
      //
      // Dispatching a native 'input' event explicitly informs Angular
      // that the value has changed, so:
      // - [(ngModel)] receives the updated value
      // - Reactive Forms update their FormControl
      // - Any (input) event bindings are triggered
      input.dispatchEvent(new Event('input'));
    }
  }
}
