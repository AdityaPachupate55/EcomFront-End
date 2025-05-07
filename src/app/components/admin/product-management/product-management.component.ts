import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-managment',
  imports: [CommonModule, RouterLink],
  templateUrl: './product-management.component.html',
  styleUrl: './product-management.component.css'
})
export class ProductManagmentComponent {
  products = [
    {
      id: 1,
      images: ['https://via.placeholder.com/50'],
      name: 'Product A',
      category: 'Category 1',
      price: 29.99,
      stock: 15,
      status: 'ACTIVE'
    },
    {
      id: 2,
      images: ['https://via.placeholder.com/50'],
      name: 'Product B',
      category: 'Category 2',
      price: 49.99,
      stock: 5,
      status: 'LOW STOCK'
    },
    {
      id: 3,
      images: ['https://via.placeholder.com/50'],
      name: 'Product C',
      category: 'Category 3',
      price: 19.99,
      stock: 0,
      status: 'INACTIVE'
    },
    {
      id: 4,
      images: ['https://via.placeholder.com/50'],
      name: 'Product D',
      category: 'Category 1',
      price: 99.99,
      stock: 25,
      status: 'ACTIVE'
    },
    {
      id: 5,
      images: ['https://via.placeholder.com/50'],
      name: 'Product E',
      category: 'Category 2',
      price: 39.99,
      stock: 8,
      status: 'LOW STOCK'
    }
  ];
}