import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
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
  constructor(private quizServiceService: QuizServiceService,private router: Router) {}

  listOfCategoriesSubs$ = new Subscription();
  questionsSubs$ = new Subscription();
  listOfCategories!: quizCategory[];
  selectedQuest!: quizQuestion[];
  listOfDifficulty: string[] = ['easy', 'medium', 'hard'];
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
        console.log(this.listOfCategories);
        // console.log(this.listOfDifficulty);
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

  updateAnswer(
    quiz: quizQuestion,
    ans: quizAnswer,
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
    console.log(quiz);
    console.log(ans);
    this.selectedQuest = Object.assign([], questionSet);
    this.toggleSubmitBtn(this.selectedQuest);
  }

  onSubmit(): void {
    this.quizServiceService.setSelectedQuest(this.selectedQuest);
    // this.router.navigate(['result']);
    // this.router.navigate(['result'], {
    //   state:{
    //     quizResult: this.selectedQuest
    //   }
    // });
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
    console.log(ansTrack);
    if (ansTrack === 5) {
      this.showSubmitBtn = true;
    }
  }

  ngOnDestroy() {
    this.listOfCategoriesSubs$.unsubscribe();
    this.questionsSubs$.unsubscribe();
  }
}
