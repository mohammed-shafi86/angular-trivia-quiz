import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { quizCategory, quizQuestion } from '../quiz-model';

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
        return response.results;
      })
    );
  }
}
