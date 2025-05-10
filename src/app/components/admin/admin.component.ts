import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../../layout/header/header.component";
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  imports: [RouterLink, HeaderComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})


export class AdminComponent implements OnInit {
  totalProducts: number = 0;
  lowStockProducts: number = 0;
  products: any[] = [];
  orders: any[] = [];
  totalOrders: number = 0;
  totalRevenue: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getProducts();
    this.getOrders();
  }

  getProducts(): void {
    this.http.get<any[]>('https://localhost:7194/api/Product').subscribe(
      data => {
        this.products = data;
        this.calculateTotals();
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  calculateTotals(): void {
    this.totalProducts = this.products.length;
    this.lowStockProducts = this.products.filter(product => product.quantity < 50).length; // Assuming low stock is defined as quantity < 10
  }

  getLowStockProducts(): any[] {
    return this.products.filter(product => product.quantity < 10);
  }

  getOrders(): void {
    this.http.get<any[]>('https://localhost:7194/api/Orders').subscribe(
      data => {
        this.orders = data;
        this.calculateOrderStats();
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching orders:', error);
      }
    );
  }

  calculateOrderStats(): void {
    this.totalOrders = this.orders.length;
    this.totalRevenue = this.orders.reduce((sum, order) => sum + order.totalPrice, 0);
  }

  
}
