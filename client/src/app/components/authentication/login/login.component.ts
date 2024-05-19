// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthService } from '../../services/auth.service';
// import { User } from '../../models/user.model';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
//   user: Partial<User> = {
//     email: '',
//     password: ''
    
//   };

//   constructor(private authService: AuthService, private router: Router) {}

//   login(): void {
//     if (this.user.email && this.user.password) {
//       this.authService.login(this.user).subscribe(
//         (response) => {
//           localStorage.setItem('token', response.token);
//           this.router.navigate(['/questions']);
//         },
//         (error) => {
//           console.error('Error logging in:', error);
//         }
//       );
//     }
//   }
// }
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(form: NgForm): void {
    if (form.invalid) {
      this.errorMessage = 'Please provide valid data.';
      return;
    }

    this.authService.login({ email: this.email, password: this.password }).subscribe(
      (response) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/questions']);
      },
      (error) => {
        this.errorMessage = 'Invalid credentials. Please try again.';
        console.error('Error logging in:', error);
      }
    );
  }
}