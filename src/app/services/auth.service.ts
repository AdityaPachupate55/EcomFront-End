import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { decodeJwtToken } from '../utils/jwt-utils';
import { CartService } from './cart.service';

interface UserRegister {
  name: string;
  email: string;
  password: string;
  phone: string;
}

interface UserLogin {
  email: string;
  password: string;
}

interface AdminLogin {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private cartService: CartService
  ) {}

  user : UserRegister = {
    name: '',
    email: '',
    password: '',
    phone: ''
  };

  userDetails: any = null; // Object to store decoded user details
  adminDetails: any = null; // Object to store decoded admin details

  private isLoggedInSubject = new BehaviorSubject<boolean>(false); // Tracks login status
  isLoggedIn$ = this.isLoggedInSubject.asObservable(); // Observable for components to subscribe

  userRegister(){
    this.http.post('https://localhost:7194/api/User/Register', this.user)
      .subscribe({
        next: (response) => {
          console.log('Registration successful', response);
          this.user = {
            name: '',
            email: '',
            password: '',
            phone: ''
          };
          alert('Registration successful!');
          this.router.navigate(['/user-login']); // Add navigation to login
        },
        error: (error) => {
          console.error('Registration failed', error);
          alert('Registration failed. Please try again.');
        }
      });
  }

  userLogin(user: UserLogin) {
    this.http.post('https://localhost:7194/api/Auth/userLogin', user, {
      responseType: 'text'
    }).subscribe(
      (token) => {
        localStorage.setItem('user_token', token);

        // Decode the JWT token and store the user details
        this.userDetails = decodeJwtToken(token);
        console.log('Decoded User Details:', this.userDetails);

        // Store user ID using the 'id' claim from the token
        if (this.userDetails && this.userDetails.id) {
          localStorage.setItem('userId', this.userDetails.id);
          console.log('User ID stored:', this.userDetails.id);
        }

        // Store user role
        if (this.userDetails.role) {
          localStorage.setItem('userRole', this.userDetails.role);
          console.log('User Role:', this.userDetails.role);
        }

        this.isLoggedInSubject.next(true);
        alert('Login successful!');
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Login failed:', error);
        alert('Login failed. Please check your credentials.');
      }
    );
  }

  adminLogin(admin: AdminLogin) {
    this.http.post('https://localhost:7194/api/Auth/adminLogin', admin, {
      responseType: 'text'
    }).subscribe(
      (token) => {
        // Store JWT token in localStorage
        localStorage.setItem('admin_token', token);

        // Decode the JWT token and store the admin details
        this.adminDetails = decodeJwtToken(token);
        console.log('Decoded Admin Details:', this.adminDetails);

        this.isLoggedInSubject.next(true); // Update login status
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

  logout() {

    const userId = localStorage.getItem('userId');

    localStorage.removeItem('user_token');
    localStorage.removeItem('admin_token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    localStorage.removeItem('selectedAddress'); // Remove selected address from local storage
    // Remove any address stored for the user
    if (userId) {
      localStorage.removeItem(`address_${userId}`);
    }

    this.userDetails = null;
    this.adminDetails = null;
    this.isLoggedInSubject.next(false);
    this.cartService.clearCart(); // Clear the cart on logout
    alert('Logout successful!');
    this.router.navigate(['/']);
  }

}
