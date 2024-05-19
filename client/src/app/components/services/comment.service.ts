import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private baseUrl = 'http://localhost:3001/api/comments';

  constructor(private http: HttpClient) {}

  getComments(answerId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.baseUrl}/answer/${answerId}`);
  }

  createComment(comment: Partial<Comment>): Observable<Comment> {
    const headers = new HttpHeaders({                                                         
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post<Comment>(this.baseUrl, comment, { headers });
  }

  updateComment(id: string, comment: Partial<Comment>): Observable<Comment> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.put<Comment>(`${this.baseUrl}/${id}`, comment, { headers });
  }

  deleteComment(id: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.delete(`${this.baseUrl}/${id}`, { headers });
  }
}