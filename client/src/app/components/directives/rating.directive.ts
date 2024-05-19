import { Directive, ElementRef, Renderer2, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appRating]'
})
export class RatingDirective implements OnChanges {
    @Input() rating: number = 0;

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    ngOnChanges() {
        this.updateRating();
    }

    private updateRating() {
        const stars = '★'.repeat(Math.round(this.rating)) + '☆'.repeat(5 - Math.round(this.rating));
        this.renderer.setProperty(this.el.nativeElement, 'innerText', stars);
    }
}