import { AuthService } from './../../services/auth.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

interface UserRegister {
  name: string;
  email: string;
  password: string;
  phone: string;
}

@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css'
})
export class UserRegisterComponent {
  user: UserRegister = {
    name: '',
    email: '',
    password: '',
    phone: ''
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  onSubmit() {
    this.authService.user = this.user;
    this.authService.userRegister();
  }
}
