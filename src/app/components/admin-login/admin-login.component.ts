import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface AdminLogin {
  email: string;
  password: string;
}


@Component({
  selector: 'app-admin-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  admin: AdminLogin = {
    email: '',
    password: ''
  };

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  onSubmit() {
    // Add responseType: 'text' to handle plain text response
    this.http.post('https://localhost:7194/api/Auth/adminLogin', this.admin, {
      responseType: 'text'
    }).subscribe(
      (token) => {
        // Store JWT token in localStorage
        localStorage.setItem('admin_token', token);
        alert('Admin logged in successfully!');
        // Navigate to admin dashboard or home page
        this.router.navigate(['/admin-dashboard']);
      },
      (error) => {
        console.error('Login failed:', error);
        alert('Login failed. Please check your credentials.');
      }
    );
  }
}
