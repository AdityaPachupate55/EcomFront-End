import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface CartItem {
  cartItemID: number;
  productId: number;
  userId: number;
  quantity: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
} 


@Component({
  selector: 'app-cartdetails',
  templateUrl: './cartdetails.component.html',
  styleUrls: ['./cartdetails.component.css'],
  imports:[CommonModule,RouterLink]
})
export class CartdetailsComponent implements OnInit {
  cartItems: CartItem[] = []; // Array to store all cart items
  activeCartItems: CartItem[] = []; // Array to store only active cart items
  private apiUrl = 'https://localhost:7194/api/Cart'; // API endpoint

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchCartDetails();
  }

  fetchCartDetails(): void {
    this.http.get<CartItem[]>(this.apiUrl).subscribe({
      next: (data: CartItem[]) => {
        this.cartItems = data; // Store all cart items
        this.activeCartItems = this.cartItems.filter(item => item.isActive); // Filter active items
        console.log('Active Cart Items:', this.activeCartItems); // Debug log
      },
      error: (error) => {
        console.error('Error fetching cart details:', error);
      }
    });
  }
}