import { Component } from '@angular/core';
import { AuthService } from '../app/components/services/auth.service';

@Component({
  selector: 'app-root',
  template: `
    <nav>
      <ul>
        <li><a routerLink="/">Home</a></li>
        <li><a routerLink="/questions">Questions</a></li>
        <li><a routerLink="/ask">Ask Question</a></li>
        <li *ngIf="!isLoggedIn"><a routerLink="/login">Login</a></li>
        <li *ngIf="!isLoggedIn"><a routerLink="/signup">Sign Up</a></li>
        <li *ngIf="isLoggedIn"><span>Hello, {{ currentUser?.email }}</span></li>
        <li *ngIf="isLoggedIn"><button (click)="logout()">Logout</button></li>
      </ul>
    </nav>
    <router-outlet></router-outlet>
    <footer>
      <p>&copy; 2023 Your App. All rights reserved.</p>
    </footer>
  `,
  styles: [
    `
      nav {
        background-color: #333;
        padding: 10px;
      }

      ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
      }

      li {
        display: inline;
        margin-right: 10px;
      }

      a {
        color: #fff;
        text-decoration: none;
      }

      footer {
        background-color: #f4f4f4;
        padding: 10px;
        text-align: center;
      }
    `,
  ],
})
export class AppComponent {
  title = 'Your App';
  currentUser: any;
  isLoggedIn = false;

  constructor(private authService: AuthService) {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
      this.isLoggedIn = !!user;
    });
  }

  logout() {
    this.authService.logout();
  }
}