import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
  constructor(private quizServiceService: QuizServiceService) {}

  ngOnInit() {
    this.quizServiceService.getQuest().subscribe((data) => {
      console.log(data);
    });
  }
}
