import { Component, Input, OnInit } from '@angular/core';
import { AnswerService } from '../services/answer.service';
import { Answer } from '../models/answer.model';
import { RatingService } from '../services/rating.service';
import { UpvoteService } from '../services/upvote.service';

@Component({
  selector: 'app-answer-list',
  templateUrl: './answer-list.component.html',
  styleUrls: ['./answer-list.component.css']
})
export class AnswerListComponent implements OnInit {
  @Input() questionId: string = '';
  answers: Answer[] = [];
  stars: number[] = [1, 2, 3, 4, 5];

  constructor(
    private answerService: AnswerService,
    private ratingService: RatingService,
    private upvoteService: UpvoteService
  ) {}

  ngOnInit(): void {
    this.loadAnswers();
  }

  loadAnswers(): void {
    this.answerService.getAnswers(this.questionId).subscribe(
      (data: Answer[]) => {
        this.answers = data;
      },
      (error: any) => {
        console.error('Error fetching answers:', error);
      }
    );
  }
  rateAnswer(id: string, rating: number): void {
    this.ratingService.rateAnswer(id, rating).subscribe(
      () => {
        this.loadAnswers(); // Reload answers after rating
      },
      (error) => {
        console.error('Error rating answer:', error);
      }
    );
  }

  upvoteAnswer(id: string): void {
    this.upvoteService.upvoteAnswer(id).subscribe(
      () => {
        this.loadAnswers(); // Reload answers after upvoting
      },
      (error) => {
        console.error('Error upvoting answer:', error);
      }
    );
  }

  getStarClass(currentRating: number, star: number): string {
    return star <= currentRating ? 'star-filled' : 'star-empty';
  }
}