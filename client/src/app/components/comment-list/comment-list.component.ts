import { Component, Input, OnInit } from '@angular/core';
import { CommentsService } from '../services/comment.service';
import { Comment } from '../models/comment.model';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {
  @Input() answerId: string = '';
  comments: Comment[] = [];
  newComment: Partial<Comment> = {
    content: '',
    answer: this.answerId
  };

  constructor(private commentsService: CommentsService) {}

  ngOnInit(): void {
    this.loadComments();
  }

  loadComments(): void {
    this.commentsService.getComments(this.answerId).subscribe(
      (data: Comment[]) => {
        this.comments = data;
      },
      (error: any) => {
        console.error('Error fetching comments:', error);
      }
    );
  }

  submitComment(): void {
    this.newComment.answer = this.answerId;
    this.commentsService.createComment(this.newComment).subscribe(
      (comment: Comment) => {
        this.comments.push(comment);
        this.newComment.content = ''; // Clear the comment input field
      },
      (error: any) => {
        console.error('Error submitting comment:', error);
      }
    );
  }
}