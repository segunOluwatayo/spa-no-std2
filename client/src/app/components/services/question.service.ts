import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private baseUrl = 'http://localhost:3001/api/questions';

  constructor(private http: HttpClient) {}

  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(this.baseUrl);
  }

  getQuestion(id: string): Observable<Question> {
    return this.http.get<Question>(`${this.baseUrl}/${id}`);
  }

  postQuestion(question: Question): Observable<Question> {
    const storedUser = localStorage.getItem('currentUser');
    const token = storedUser ? JSON.parse(storedUser).token : null;
    console.log('Token:', token); // Add this line to check the token value
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Question>(this.baseUrl, question, { headers });
  }

  updateQuestion(id: string, question: Partial<Question>): Observable<Question> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.put<Question>(`${this.baseUrl}/${id}`, question, { headers });
  }

  deleteQuestion(id: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.delete(`${this.baseUrl}/${id}`, { headers });
  }

  upvoteQuestion(id: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post(`${this.baseUrl}/${id}/upvote`, {}, { headers });
  }
}