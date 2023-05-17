import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appQuizScoreHighlight]',
  standalone: true,
})
export class QuizScoreHighlightDirective implements OnInit {
  @Input() appQuizScoreHighlight!: number;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    const score = this.appQuizScoreHighlight;
    if (score <= 1) {
      this.el.nativeElement.classList.add('red');
    } else if (score <= 3) {
      this.el.nativeElement.classList.add('yellow');
    } else if (score <= 5) {
      this.el.nativeElement.classList.add('green');
    }
  }
}
