import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, switchMap } from 'rxjs';
import { quizQuestion } from '../quiz-model';
import { QuizServiceService } from '../services/quiz-service.service';

@Component({
  selector: 'app-quiz-result',
  standalone: true,
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.css'],
  imports: [CommonModule, HttpClientModule],
  providers: [QuizServiceService],
})
export class QuizResultComponent implements OnInit {
  selectedQuest!: quizQuestion[];
  constructor(private quizServiceService: QuizServiceService, private router:Router, private activeRoute: ActivatedRoute) {
console.log(this.router.getCurrentNavigation());
  }

  selectedQuest$!: Observable<quizQuestion[]>;
  ngOnInit() {
    /*this.quizServiceService.getQuest().subscribe((data) => {
      // debugger;
      if (data) {
        this.selectedQuest = data;
        console.log(this.selectedQuest);
      }
    });*/
    // console.log(this.selectedQuest);
    // this.quizServiceService.getQuest().subscribe((data) => {
    //   console.log(data);
    // });
  }
}
