import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private baseUrl = 'http://localhost:3001/api/ratings';

  constructor(private http: HttpClient) {}

  rateAnswer(answerId: string, rating: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post(`${this.baseUrl}/answer/${answerId}`, { rating }, { headers });
  }

  rateQuestion(questionId: string, rating: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post(
      `${this.baseUrl}/question/${questionId}`,
      { rating },
      { headers }
    );
  }
}