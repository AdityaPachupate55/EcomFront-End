import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { decodeJwtToken } from '../utils/jwt-utils';
import { CartService } from './cart.service';
import { NotifyService } from './notify.service';

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
    private cartService: CartService,
    private notifyService: NotifyService
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
          this.notifyService.successRegistration(); // Notify user of successful registration
          this.router.navigate(['/user-login']); // Add navigation to login
        },
        error: (error) => {
          console.error('Registration failed', error);
          this.notifyService.errorRegistration(); // Notify user of failed registration
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
        this.notifyService.successLogin(); // Notify user of successful login
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Login failed:', error);
        this.notifyService.errorLogin(); // Notify user of failed login
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
        this.notifyService.successLogin(); // Notify user of successful login
        // Navigate to admin dashboard or home page
        this.router.navigate(['/admin-dashboard']);
      },
      (error) => {
        console.error('Login failed:', error);
        this.notifyService.errorLogin(); // Notify user of failed login
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
    this.notifyService.succesLogout(); // Notify user of successful logout
    this.router.navigate(['/']);
  }

}
