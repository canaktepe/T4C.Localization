import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appToggleClass]'
})
export class ToggleClassDirective {

  constructor(private elRef: ElementRef,
    private renderer: Renderer2) { }

  @HostListener("click")
  public onClick(): void {
    const buttonEl = this.elRef.nativeElement;


    const isOpen = buttonEl.classList.contains('btn-light');
    if (isOpen) {
      this.renderer.removeClass(buttonEl, 'btn-light');
      this.renderer.removeClass(buttonEl, 'text-dark');
      this.renderer.addClass(buttonEl, 'btn-danger');
      
    } else {
      this.renderer.removeClass(buttonEl, 'btn-danger');
      this.renderer.addClass(buttonEl, 'btn-light');
         this.renderer.addClass(buttonEl, 'text-dark');
    }
  }
}
