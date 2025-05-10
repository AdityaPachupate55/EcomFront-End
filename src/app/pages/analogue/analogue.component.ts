import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { Component, OnInit } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { HeaderComponent } from '../../layout/header/header.component';
import {
  ProductService,
  Product as IProduct,
} from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { FooterComponent } from '../../layout/footer/footer.component';

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  description: string;
  imageUrl: string;
  quantity: number;
  categoryId: number;
  subCategoryId: number;
  soldCount: number;
}

@Component({
  selector: 'app-analogue',
  imports: [CommonModule, HeaderComponent,FooterComponent,RouterModule],
  templateUrl: './analogue.component.html',
  styleUrl: './analogue.component.css',
})
export class AnalogueComponent {
  products: Product[] = [];
  loading: boolean = false;
  error: string | null = null;
  categoryTitle = '';

  categoryMap: { [key: number]: string } = {
    1: 'Digital',
    2: 'Analogue',
    3: 'Smart',
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private IproductService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('user_token');
    if (!token) {
      this.router.navigate(['/login']);
      return new HttpHeaders();
    }
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.status === 401) {
      errorMessage = 'Session expired. Please login again';
      localStorage.removeItem('user_token');
      this.router.navigate(['/login']);
    }
    return throwError(() => errorMessage);
  }

  loadProducts() {
    this.loading = true;
    const headers = this.getHeaders();

    this.http
      .get<Product[]>('https://localhost:7194/api/Product?category=2', {
        headers,
      })
      .pipe(catchError(this.handleError.bind(this)))
      .subscribe({
        next: (data) => {
          this.products = data;
          this.loading = false;
        },
        error: (errorMessage) => {
          console.error('Error loading products:', errorMessage);
          this.error = errorMessage;
          this.loading = false;
        },
      });
  }

  onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = 'assets/images/default-product-image.jpg'; // Correct path to the fallback image
    target.onerror = null; // Prevent infinite loop if the fallback image also fails
  }

  // onAddToCart(productId: number) {
  //   const token = localStorage.getItem('user_token');
  //   if (!token) {
  //     alert('Please login to add items to cart');
  //     this.router.navigate(['/login']);
  //     return;
  //   }

  //   console.log('Product added to cart, ID:', productId);
  // }

  getCategoryName(categoryId: number): string {
    return this.categoryMap[categoryId] || 'Unknown';
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product, 1);
    alert(`${product.name} added to cart!`);
  }

  sortProducts(event: Event): void {
    const sortBy = (event.target as HTMLSelectElement).value;

    switch (sortBy) {
      case 'name':
        this.products.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        this.products.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'price-low':
        this.products.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        this.products.sort((a, b) => b.price - a.price);
        break;
    }
  }
}
