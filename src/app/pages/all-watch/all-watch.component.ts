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
import { ProductService, Product as IProduct } from '../../services/product.service';
import { CartService } from '../../services/cart.service'
import { HeaderComponent } from "../../layout/header/header.component";
import { FooterComponent } from "../../layout/footer/footer.component";
import { AuthService } from '../../services/auth.service';

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
  selector: 'app-all-watch',
  standalone: true,
  imports: [CommonModule, HttpClientModule, CommonModule,
    RouterModule, HeaderComponent, FooterComponent], // Add HttpClientModule here
  templateUrl: './all-watch.component.html',
  styleUrls: ['./all-watch.component.css'], // Fixed typo: styleUrl -> styleUrls
})
export class AllWatchComponent implements OnInit {

  products: Product[] = [];
  loading: boolean = false;
  error: string | null = null;
  categoryTitle = "";
  successMessage: string = '';
  errorMessage: string = '';

  categoryMap: { [key: number]: string } = {
    1: 'Digital',
    2: 'Analogue',
    3: 'Smart',
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private IproductService: ProductService,
    private cartService: CartService,
    private authService: AuthService,
    // private route: ActivatedRoute

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
      .get<Product[]>('https://localhost:7194/api/Product', { headers })
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

  addToCart(product: Product): void {
    this.cartService.addToCart(product, 1);
    this.successMessage = `${product.name} added to cart!`;
    // Clear message after 3 seconds
    setTimeout(() => {
      this.successMessage = '';
    }, 3000);
  }

  getCategoryName(categoryId: number): string {
    return this.categoryMap[categoryId] || 'Unknown';
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

  truncateName(name: string, wordLimit: number = 4): string {
    const words = name.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return name;
  } 
sample(productId: number): void {
  console.log('Product ID:', productId);
}
}
