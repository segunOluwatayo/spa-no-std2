import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3001/api/users';
  private currentUserSubject: BehaviorSubject<any>;  // Specify the type expected within the BehaviorSubject
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    const storedUserJSON = typeof window !== 'undefined' ? localStorage.getItem('currentUser') : null;
    const storedUser = storedUserJSON ? JSON.parse(storedUserJSON) : null; // Safely parse the JSON only if it's not null
    this.currentUserSubject = new BehaviorSubject(storedUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  signup(user: Partial<any>): Observable<any> {  // Ensure to specify type for Partial
    return this.http.post<any>(`${this.baseUrl}/signup`, user).pipe(
      map(user => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        this.currentUserSubject.next(user);
        return user;
      })
    );
  }

  login(user: Partial<any>): Observable<any> {  // Ensure to specify type for Partial
    return this.http.post<any>(`${this.baseUrl}/login`, user).pipe(
      map(user => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        this.currentUserSubject.next(user);
        console.log('User:', user); 
        return user;
      })
    );
  }

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('currentUser');
    }
    this.currentUserSubject.next(null);
  }
}