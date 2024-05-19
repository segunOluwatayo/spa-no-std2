import { Component } from '@angular/core';
import { AuthService } from '../app/components/services/auth.service';

@Component({
  selector: 'app-root',
  template: `
    <header>
    <div class="container">
        <a routerLink="/" class="logo">Qwiloo</a>

        <input type="text" placeholder="Search Posts..." />

        <div class="actions">
            <a *ngIf="!isLoggedIn" routerLink="/signup" class="signup">Sign Up</a>
            <a *ngIf="!isLoggedIn" routerLink="/login">Login</a>

            <div *ngIf="isLoggedIn" class="profile">
                <span class="name">{{ currentUser?.username }}</span>
                <a routerLink="/account">Account</a>
                <button (click)="logout()">Logout</button> 
            </div>
        </div>
    </div>
    </header>

    <router-outlet></router-outlet>
    
    <footer class="footer">
      <div class="footer-left">
        <p>&copy; 2024 Qwiloo. All rights reserved.</p>
      </div>
    
      <div class="footer-center">
        <p>Contact Our Team</p>
        <a href="mailto:ourteam@gmail.com">ourteam&#64;gmail.com</a>
        <p>+353 899 547 634</p>
        <p>21 South Circular Road, Dublin, Ireland</p>
      </div>
    
      <div class="footer-right">
        <p>Follow Us</p>
        <div class="social-icons">
          <a href="#" class="social-icon"><i class="fa-brands fa-linkedin"></i></a>
          <a href="#" class="social-icon"><i class="fa-brands fa-facebook"></i></a>
          <a href="#" class="social-icon"><i class="fa-brands fa-twitter"></i></a>
          <a href="#" class="social-icon"><i class="fa-brands fa-instagram"></i></a>
        </div>
      </div>
    </footer>

  `,
  styles: [
    `
      @import url('https://fonts.googleapis.com/css?family=Kaushan+Script');

      header {
          background-color: #f0f0f0; /* Light gray background */
          padding: 15px 0;
      }

      .container {
          display: flex;
          align-items: center;
          max-width: 1200px; /* Adjust as needed */
          margin: 0 auto; /* Center the container */
      }

      .logo {
          font-family: "Kaushan Script", cursive; /* Replace with your chosen font */
          font-size: 24px;
          margin-right: 20px;
          color: #333; /* Dark gray text */
          text-decoration: none;
      }

      input[type="text"] {
          flex-grow: 1; /* Allow input to expand */
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 5px;
      }

      .actions {
          margin-left: 20px;
          display: flex;
          align-items: center;
      }

      .actions a, .actions button {
          padding: 8px 15px;
          border: none;
          background-color: #007bff; /* Blue background */
          color: white;
          border-radius: 5px;
          text-decoration: none;
          margin-right: 10px; /* Space between buttons/links */
          cursor: pointer;
      }

      .profile {
          display: flex;
          align-items: center;
      }

      .profile .name {
          margin-right: 10px;
          font-weight: bold;
      }

      /* Optional: Style for hover states */
      .actions a:hover, .actions button:hover {
          background-color: #0056b3; /* Darker blue on hover */
      }

      .footer {
        background-color: #BF5700; /* Orange background */
        color: white;
        padding: 20px;
        display: flex; /* Flexbox for layout */
        justify-content: space-between; /* Even spacing */
      }
      
      .footer-left,
      .footer-center,
      .footer-right {
        flex: 1; /* Equal width for sections */
        text-align: center; /* Center text within sections */
      }
      
      .footer-center p {
        margin: 5px 0; /* Adjust margin as needed */
      }
      
      .social-icons a {
        color: white;
        margin: 0 10px;
        font-size: 1.2rem;
        transition: all 0.2s ease; /* Transition all properties for flexibility */
      }
      
      .social-icon {
        display: inline-block; /* Ensure the icon is a block-level element */
        width: 30px; /* Set a fixed width for the icon */
        height: 30px; /* Set a fixed height for the icon */
        line-height: 30px; /* Vertically center the icon */
        text-align: center; /* Center the icon within the container */
      }
      
      .social-icons a:hover .social-icon {
        transform: scale(1.2); /* Apply the scale transformation on hover */
      }
      
      .footer-center a {
        color: white; /* Make email link white */
        text-decoration: none; /* Remove underline */
      }
    `,
  ],
})
export class AppComponent {
  title = 'Qwiloo';
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