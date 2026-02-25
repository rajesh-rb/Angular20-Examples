import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[apprequirederror]',
  standalone: true,
})
export class RequiredError {
  // Input #1: Is this field required?
  //
  // The component decides this and passes it to the directive.
  // Example:
  // <input appRequiredError [requiredField]="true" />
  @Input() requiredField: boolean = false;

  // Input #2: Should we show the required error right now?
  //
  // Typical real-time usage:
  // - Initially: showError = false (don’t show errors on first load)
  // - After submit click: showError = true (show errors for invalid fields)
  //
  // Example:
  // <input appRequiredError [showError]="isSubmitted && isNameInvalid" />
  @Input() showError: boolean = false;

  // ElementRef points to the exact host element (input/select/textarea/etc.)
  // Renderer2 is used to safely add/remove styles (Angular recommended approach)
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}

  // ngOnChanges is called automatically whenever ANY @Input() value changes.
  // That means this method will run when:
  // - requiredField changes (true/false)
  // - showError changes (true/false)
  //
  // This is perfect for directives because the UI can react immediately
  // without the component manually calling anything.
  ngOnChanges(): void {
    this.applyRequiredErrorStyle();
  }

  // Applies or removes the "required error" UI styling based on the current inputs.
  private applyRequiredErrorStyle(): void {
    // The actual DOM element where the directive is attached.
    // Example: the real <input> element.
    const element = this.el.nativeElement;

    // STEP 1: Always reset/remove previous error styles first.
    // Why?
    // - If the field becomes valid later, old red border/glow must be removed.
    // - Keeps UI consistent with the latest state.
    this.renderer.removeStyle(element, 'border');
    this.renderer.removeStyle(element, 'box-shadow');

    // STEP 2: Apply error styles only when:
    // - field is marked as required AND
    // - the component says "show error now"
    //
    // This prevents showing errors on first load and shows them only when needed.
    if (this.requiredField && this.showError) {
      // Red border (Bootstrap danger color style)
      this.renderer.setStyle(element, 'border', '1px solid #dc3545');

      // Soft red glow to visually indicate error state
      this.renderer.setStyle(element, 'box-shadow', '0 0 0 .2rem rgba(220,53,69,.15)');
    }
  }
}
