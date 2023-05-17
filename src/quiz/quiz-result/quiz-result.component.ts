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
  constructor(private router: Router) {
    this.selectedQuizQuest =
      this.router.getCurrentNavigation()?.extras.state?.quiz;
    this.score = this.router.getCurrentNavigation()?.extras.state?.score;
  }

  redirect(path: string): void {
    this.router.navigate([path]);
  }
}
