import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appScrollAnimate]',
})
export class ScrollAnimateDirective implements OnInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.renderer.addClass(this.el.nativeElement, 'animate-in');
          observer.unobserve(this.el.nativeElement);
        }
      },
      { threshold: 0.2 } // Triggers animation when 20% of the section is visible
    );

    observer.observe(this.el.nativeElement);
  }
}
