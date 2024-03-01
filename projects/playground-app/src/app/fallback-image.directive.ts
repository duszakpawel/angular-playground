import { Directive, ElementRef, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[appFallbackImage]'
})
export class FallbackImageDirective {
  @Input()
  appFallbackImage: string | undefined;

  constructor(private el: ElementRef) {}

  @HostListener('error') onError() {
    const element: HTMLImageElement = this.el.nativeElement;
    element.src = this.appFallbackImage || '/assets/cats/errorCat.png';
  }
}
