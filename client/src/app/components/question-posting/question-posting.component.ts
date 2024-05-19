import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from '../services/question.service';
import { Question } from '../models/question.model';

@Component({
  selector: 'app-question-posting',
  templateUrl: './question-posting.component.html',
  styleUrls: ['./question-posting.component.css']
})
export class QuestionPostingComponent {
  question: Question = {
    _id: '',
    title: '',
    description: '',
    author: {
      _id: '',
      name: '',
      email: '', 
      password: ''
    }
  };

  constructor(private questionService: QuestionService, private router: Router) {}

  postQuestion(): void {
    this.questionService.postQuestion(this.question).subscribe(
      () => {
        this.router.navigate(['/questions']);
      },
      (error) => {
        console.error('Error posting question:', error);
      }
    );
  }
}