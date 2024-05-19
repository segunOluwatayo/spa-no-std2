import { Component, Input } from '@angular/core';
import { AnswerService } from '../services/answer.service';
import { AuthService } from '../services/auth.service';
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

  constructor(
    private answerService: AnswerService,
    private authService: AuthService
  ) {}

  submitAnswer(): void {
    console.log('Submitting answer:', this.answer);
  
    // Get the current user from the AuthService
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      this.answer.author = currentUser._id; // Set only the user's _id as the author
    }
  
    // Set the question field here
    this.answer.question = this.questionId;
  
    // Create a new answer object with only the necessary fields
    const answerToSubmit: Answer = {
      _id: '',
      content: this.answer.content,
      author: this.answer.author as string,
      question: this.answer.question
    };
  
    this.answerService.createAnswer(this.questionId, answerToSubmit).subscribe(
      () => {
        this.answer.content = ''; // Clear the answer input field
      },
      (error) => {
        console.error('Error submitting answer:', error);
      }
    );
  }
}