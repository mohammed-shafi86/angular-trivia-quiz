import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { quizAnswer, quizCategory, quizQuestion } from '../quiz-model';
import { QuizServiceService } from '../services/quiz-service.service';

@Component({
  selector: 'app-quiz-maker',
  standalone: true,
  templateUrl: './quiz-maker.component.html',
  styleUrls: ['./quiz-maker.component.css'],
  imports: [CommonModule, HttpClientModule, FormsModule],
  providers: [QuizServiceService],
})
export class QuizMakerComponent implements OnInit, OnDestroy {
  constructor(private quizServiceService: QuizServiceService) {}

  listOfCategoriesSubs$ = new Subscription();
  questionsSubs$ = new Subscription();
  listOfCategories!: quizCategory[];
  selectedQuest!: quizQuestion[];
  listOfDifficulty: string[] = ['easy', 'medium', 'hard'];
  selectedQuestion = {
    id: -1,
    difficulty: '',
  };

  ngOnInit() {
    this.selectedQuest = [];
    this.listOfCategoriesSubs$ = this.quizServiceService
      .loadCategory()
      .subscribe((data) => {
        this.listOfCategories = data;
        console.log(this.listOfCategories);
        // console.log(this.listOfDifficulty);
      });
  }

  setCategory(cat: HTMLSelectElement): void {
    console.log(cat.value);
    this.selectedQuestion.id = Number(cat.value);
  }

  setDifficulty(diff: HTMLSelectElement): void {
    console.log(diff.value);
    this.selectedQuestion.difficulty = diff.value;
  }

  onSubmit(): void {
    this.selectedQuest = [];
    if (
      this.selectedQuestion.id === -1 ||
      this.selectedQuestion.difficulty === ''
    ) {
      return;
    }
    this.getQuestions(
      this.selectedQuestion.id,
      this.selectedQuestion.difficulty
    );
  }

  getQuestions(category: number, difficulty: string): void {
    this.questionsSubs$ = this.quizServiceService
      .loadQuestions(category, difficulty)
      .subscribe((data) => {
        this.selectedQuest = data;
        console.log(this.selectedQuest);
      });
  }

  updateAnswer(quiz: quizQuestion, ans: quizAnswer): void {
    console.log(quiz);
    console.log(ans);
  }

  ngOnDestroy() {
    this.listOfCategoriesSubs$.unsubscribe();
    this.questionsSubs$.unsubscribe();
  }
}
