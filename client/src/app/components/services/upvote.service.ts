import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpvoteService {
  private baseUrl = 'http://localhost:3001/api/upvotes';

  constructor(private http: HttpClient) {}

  upvoteQuestion(questionId: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post(`${this.baseUrl}/question/${questionId}`, {}, { headers });
  }

  upvoteAnswer(answerId: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post(`${this.baseUrl}/answer/${answerId}`, {}, { headers });
  }
}