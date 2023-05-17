import { NgModule } from '@angular/core';
import { QuizScoreHighlightDirective } from '../../directives/quiz-score-highlight.directive';

@NgModule({
  imports: [QuizScoreHighlightDirective],
  declarations: [],
  exports: [QuizScoreHighlightDirective],
})
export class SharedModuleModule {}
