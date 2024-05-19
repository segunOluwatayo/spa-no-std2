import { Component, Input } from '@angular/core';
import { AnswerService } from '../services/answer.service';
import { Answer } from '../models/answer.model';

@Component({
  selector: 'app-answer-submission',
  templateUrl: './answer-submission.component.html',
  styleUrls: ['./answer-submission.component.css']
})
export class AnswerSubmissionComponent {
  @Input() questionId: string = '';
  answer: Answer = {
    _id: '',
    content: '',
    author: {
      _id: '',
      name: '',
      email: '',
      password: ''
    },
    question: this.questionId
  };
    constructor(private answerService: AnswerService) {}
    
    submitAnswer(): void {
      console.log('Submitting answer:', this.answer);
      this.answer.author = {
        _id: localStorage.getItem('userId') || '',
        name: '',
        email: '',
        password: ''
      };
      // Set the question field here
      this.answer.question = this.questionId;
      this.answerService.createAnswer(this.answer).subscribe(
        () => {
          this.answer.content = ''; // Clear the answer input field
        },
        (error) => {
          console.error('Error submitting answer:', error);
        }
      );
    }
    
    
    }