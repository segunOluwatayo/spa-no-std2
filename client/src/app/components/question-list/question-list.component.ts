import { Component, OnInit } from '@angular/core';
import { Question } from '../models/question.model';
import { QuestionService } from '../services/question.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {
  questions: Question[] = [];

  constructor(private questionService: QuestionService) {}

  ngOnInit() {
    this.getQuestions();
  }

  getQuestions() {
    this.questionService.getQuestions().subscribe(
      (data: Question[]) => {
        this.questions = data;
      },
      (error: any) => {
        console.error('Error fetching questions:', error);
      }
    );
  }

  deleteQuestion(questionId: string) {
    this.questionService.deleteQuestion(questionId).subscribe(
      () => {
        // Remove the deleted question from the list
        this.questions = this.questions.filter(q => q._id !== questionId);
      },
      (error: any) => {
        console.error('Error deleting question:', error);
      }
    );
  }
}