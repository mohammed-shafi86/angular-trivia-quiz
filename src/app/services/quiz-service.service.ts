import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { quizAnswer, quizCategory, quizQuestion } from '../quiz-model';

@Injectable()
export class QuizServiceService {
  selectedQuest!: quizQuestion[];
  constructor(private http: HttpClient, private route: Router) {}

  //Load category from API 'https://opentdb.com/api_category.php'
  loadCategory(): Observable<quizCategory[]> {
    return this.http
      .get<quizCategory[]>('https://opentdb.com/api_category.php')
      .pipe(
        map((response: any) => {
          return response.trivia_categories;
        })
      );
  }

  //Load questions from API 'https://opentdb.com/api.php?amount=5&category=11&difficulty=easy&type=multiple' by passing 'category' & 'difficulty'
  loadQuestions(
    category: number,
    difficulty: string
  ): Observable<quizQuestion[]> {
    const questURL = `https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=multiple`;
    return this.http.get<quizQuestion[]>(questURL).pipe(
      map((response: any) => {
        let quiz: quizQuestion[];
        quiz = response.results.map((q: quizQuestion) => {
          let ans: quizAnswer[] = [];
          ans.push({
            answer: q.correct_answer,
            isCorrect: true,
            isSelected: false,
          });
          q.incorrect_answers.map((inc: string) => {
            ans.push({ answer: inc, isCorrect: false, isSelected: false });
          });
          q = { ...q, quizAns: this.shuffelArray(ans) };
          return q;
        });
        return this.shuffelArray(quiz);
      })
    );
  }

  //verify answer and redirect to 'result' page with score and selected questions and answer
  verifyAndSubmitQuest(questObj: quizQuestion[]) {
    const finalScore = this.calculateScore(questObj);
    this.route.navigateByUrl('result', {
      state: { quiz: questObj, score: finalScore },
    });
  }

  // Calculate score if both flag 'isSelected' & 'isCorrect' are ture
  calculateScore(questObj: quizQuestion[]): number {
    const score =
      questObj
        .map((q) => {
          return {
            ...q,
            quizAns: q.quizAns?.filter(
              (ans) => ans.isCorrect === true && ans.isSelected === true
            ),
          };
        })
        ?.filter((x) => x.quizAns?.length !== 0)?.length || 0;
    return score;
  }

  //Shuffel the Array of object for sorting it's array position randomaly
  shuffelArray(arr: any[]) {
    return arr.sort(() => Math.random() - 0.5);
  }
}
