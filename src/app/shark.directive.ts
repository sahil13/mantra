import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appShark]',
})
export class SharkDirective {
  constructor(private elem: ElementRef, private renderer: Renderer2) {
  }

  @HostListener('input') onInput(){
    this.elem.nativeElement.value = ((this.elem.nativeElement.value).toUpperCase());
  }

  changeTextColor(color){
    this.renderer.setStyle(this.elem.nativeElement , 'color', color);
  }
}
