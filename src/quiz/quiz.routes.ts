import { Route } from '@angular/router';
import { QuizMakerComponent } from './quiz-maker/quiz-maker.component';
import { QuizResultComponent } from './quiz-result/quiz-result.component';

export const routes: Route[] = [
  {
    path: '',
    component: QuizMakerComponent,
  },
  {
    path: 'result',
    component: QuizResultComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
