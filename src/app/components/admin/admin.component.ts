
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

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getProducts();
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
    this.lowStockProducts = this.products.filter(product => product.quantity < 10).length; // Assuming low stock is defined as quantity < 10
  }
}
