import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { quizResult } from '../quiz-model';
import { QuizServiceService } from '../services/quiz-service.service';
import { SharedModuleModule } from '../shared/modules/shared-module/shared-module.module';

@Component({
  selector: 'app-quiz-result',
  standalone: true,
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.css'],
  imports: [CommonModule, HttpClientModule, SharedModuleModule],
  providers: [QuizServiceService],
})
export class QuizResultComponent {
  selectedQuizQuest!: quizResult[];
  score!: number;

  //get the data from state with the help of 'router'.
  //Note: to get data from state we need to get it inside constructor only else it will not work
  constructor(private router: Router) {
    this.selectedQuizQuest =
      this.router.getCurrentNavigation()?.extras.state?.quiz;
    this.score = this.router.getCurrentNavigation()?.extras.state?.score;
  }

  // redirect to the desired path which is passed through parameter
  redirect(path: string): void {
    this.router.navigate([path]);
  }
}
