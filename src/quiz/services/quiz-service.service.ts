import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, of, Subject } from 'rxjs';
import { quizAnswer, quizCategory, quizQuestion } from '../quiz-model';

@Injectable()
export class QuizServiceService {
  selectedQuest!: quizQuestion[];
  private selectedQuestObs$ = new BehaviorSubject<quizQuestion[] | null>(null);
  constructor(private http: HttpClient, private route: Router) {}

  //Load category from API
  loadCategory(): Observable<quizCategory[]> {
    return this.http
      .get<quizCategory[]>('https://opentdb.com/api_category.php')
      .pipe(
        map((response: any) => {
          return response.trivia_categories;
        })
      );
  }

  //Load questions from API by passing 'category' & 'difficulty'
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

  //set the selectedQuest
  setSelectedQuest(questObj: quizQuestion[]) {
    this.selectedQuest = questObj;
    this.selectedQuestObs$.next(questObj);
    this.route.navigate(['result']);
  }

  //set the selectedQuest
  getQuest(): Observable<quizQuestion[] | null> {
    // return of(this.selectedQuest);
    return this.selectedQuestObs$.asObservable();
  }

  //Shuffel the Array of object
  shuffelArray(arr: any[]) {
    return arr.sort(() => Math.random() - 0.5);
  }
}
