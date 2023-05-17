import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
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
  listOfDifficulty: string[] = ['Easy', 'Medium', 'Hard'];
  selectedQuestion = {
    id: -1,
    difficulty: '',
  };
  showSubmitBtn!: boolean;

  ngOnInit() {
    this.selectedQuest = [];
    this.showSubmitBtn = false;
    this.listOfCategoriesSubs$ = this.quizServiceService
      .loadCategory()
      .subscribe((data) => {
        this.listOfCategories = data;
      });
  }

  setCategory(cat: HTMLSelectElement): void {
    this.selectedQuestion.id = Number(cat.value);
  }

  setDifficulty(diff: HTMLSelectElement): void {
    this.selectedQuestion.difficulty = diff.value;
  }

  onCreate(): void {
    this.selectedQuest = [];
    if (
      this.selectedQuestion.id === -1 ||
      this.selectedQuestion.difficulty === ''
    ) {
      return;
    }
    this.getQuestions(
      this.selectedQuestion.id,
      this.selectedQuestion.difficulty.toLocaleLowerCase()
    );
  }

  getQuestions(category: number, difficulty: string): void {
    this.questionsSubs$ = this.quizServiceService
      .loadQuestions(category, difficulty)
      .subscribe((data) => {
        this.selectedQuest = data;
      });
  }

  updateAnswer(
    quiz: quizQuestion,
    ansIndex: number,
    questionSet: quizQuestion[],
    quesIndex: number
  ): void {
    let answerSet: quizAnswer[] = quiz.quizAns || [];
    answerSet.map((q, i) => {
      if (i !== ansIndex) {
        q.isSelected = false;
      } else {
        q.isSelected = true;
      }
      return q;
    });

    quiz = { ...quiz, quizAns: answerSet };
    questionSet[quesIndex] = quiz;
    this.selectedQuest = Object.assign([], questionSet);
    this.toggleSubmitBtn(this.selectedQuest);
  }

  onSubmit(): void {
    this.quizServiceService.verifyAndSubmitQuest(this.selectedQuest);
  }

  toggleSubmitBtn(quiz: quizQuestion[]): void {
    this.showSubmitBtn = false;
    let ansTrack: number = 0;
    quiz.map((question: quizQuestion) => {
      let qAns = question.quizAns || [];
      qAns.map((qa) => {
        if (qa.isSelected === true) {
          ansTrack++;
        }
      });
    });
    if (ansTrack === 5) {
      this.showSubmitBtn = true;
    }
  }

  ngOnDestroy() {
    this.listOfCategoriesSubs$.unsubscribe();
    this.questionsSubs$.unsubscribe();
  }
}
