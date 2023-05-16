import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { quizAnswer, quizCategory, quizQuestion } from '../quiz-model';

@Injectable()
export class QuizServiceService {
  constructor(private http: HttpClient) {}

  loadCategory(): Observable<quizCategory[]> {
    return this.http
      .get<quizCategory[]>('https://opentdb.com/api_category.php')
      .pipe(
        map((response: any) => {
          return response.trivia_categories;
        })
      );
  }

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
          q = { ...q, quizAns: ans };
          return q;
        });
        return quiz;
      })
    );
  }
}
