import { Directive, ElementRef, Renderer2, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appUpvote]'
})
export class UpvoteDirective {
@Input() upvoted: boolean = false;

constructor(private el: ElementRef, private renderer: Renderer2) {
    this.updateUpvote();
}

@HostListener('click') toggleUpvote() {
    this.upvoted = !this.upvoted;
    this.updateUpvote();
}

  private updateUpvote() {
    if (this.upvoted) {
      this.renderer.addClass(this.el.nativeElement, 'upvoted');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'upvoted');
    }
  }
}