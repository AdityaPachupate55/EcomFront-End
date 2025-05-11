import { CommonModule, NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-management',
  imports: [NgFor, FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users: any[] = [];
  roles: string[] = ['Admin', 'User', 'Guest'];
  filteredUsers: any[] = [];
  searchTerm: string = '';
  selectedRole: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.http.get<any[]>('https://localhost:7194/api/User').subscribe(
      (data: any) => {
        console.log('Fetched users:', data); // Add this line to check the response data
        this.users = data;
        this.filteredUsers = data;
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  filterUsers(): void {
    this.filteredUsers = this.users.filter(user => {
      return user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
             (this.selectedRole ? user.role === this.selectedRole : true);
    });
  }

  deleteUser(userId: number): void {
    console.log('Deleting user with userId:', userId); // Add this line to check the userId
    this.http.delete(`https://localhost:7194/api/User/${userId}`).subscribe(
      () => {
        this.users = this.users.filter(u => u.userId !== userId);
        this.filterUsers(); // Call filterUsers to update the filteredUsers array
      },
      (error: HttpErrorResponse) => {
        console.error('Error deleting user:', error);
      }
    );
  }
}
