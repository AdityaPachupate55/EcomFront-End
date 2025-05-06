import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink, RouterModule } from '@angular/router';

interface UserLogin {
  email: string;
  password: string;
}


@Component({
  selector: 'app-user-login',
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {
  user: UserLogin = {
    email: '',
    password: ''
  };

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  onSubmit() {
    this.http.post('https://localhost:7194/api/Auth/userLogin', this.user, {
      responseType: 'text'
    }).subscribe(
      (token) => {
        localStorage.setItem('user_token', token);
        alert('Login successful!');
        this.router.navigate(['/']);      },
      (error) => {
        console.error('Login failed:', error);
        alert('Login failed. Please check your credentials.');
      }
    );
  }
}
