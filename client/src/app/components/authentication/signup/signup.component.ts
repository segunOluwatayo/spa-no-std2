import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  username: string = ''; // Add the username property
  errorMessage: string = '';
  showPassword = false; // Add this property to track password visibility

  constructor(private authService: AuthService, private router: Router) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  
  signup(form: NgForm): void {
    if (form.invalid) {
      this.errorMessage = 'Please provide valid data.';
      return;
    }

    this.authService.signup({ name: this.name, email: this.email, password: this.password, username: this.username }).subscribe(
      () => {
        this.router.navigate(['/login']);
      },
      (error) => {
        this.errorMessage = 'Error signing up. Please try again.';
        console.error('Error signing up:', error);
      }
    );
  }
}