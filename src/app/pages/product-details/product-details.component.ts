import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../../layout/header/header.component";
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  description: string;
  imageUrl: string;
  categoryId: number;
  subCategoryId: number;
  quantity: number;
  soldCount: number;
}

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productId!: number;
  product!: Product;
  quantity: number = 1; // Default quantity

  isAddressFormVisible: boolean = false; // Controls the visibility of the address form
  newAddress: any = {
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: ''
  };

  addresses: any[] = []; // Stores the list of addresses
  selectedAddress: any = null; // Stores the selected address

  private addressApiUrl = 'https://localhost:7194/api/Address'; // Replace with your API endpoint

  constructor(
    @Inject(ProductService) private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private router: Router,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const productId = params.get('id');
      if (productId) {
        this.getProductDetails(+productId); // Pass the product ID as a number
      } else {
        this.router.navigate(['/all-watch']); // Redirect if no ID is found
      }
    });

    this.fetchAddresses(); // Fetch addresses on component initialization
  }

  getProductDetails(productId: number): void {
    console.log('Fetching product details for ID:', productId); // Debugging
    this.productService.getProductById(productId).subscribe({
      next: (data: Product) => {
        this.product = data;
        console.log('Product Details:', this.product); // Debugging
      },
      error: (err) => {
        console.error('Error fetching product details:', err);
        alert('Failed to fetch product details. Please try again.');
      }
    });
  }

  fetchAddresses(): void {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.log('User not logged in. Skipping address fetch.');
      return; // Do not fetch addresses if the user is not logged in
    }

    this.http.get<any[]>(`${this.addressApiUrl}/user/${userId}`).subscribe({
      next: (response) => {
        this.addresses = response;
        if (this.addresses.length > 0) {
          this.selectedAddress = this.addresses[0]; // Default to the first address
        }
      },
      error: (err) => {
        console.error('Error fetching addresses:', err);
        this.addresses = []; // Ensure the dropdown shows "No records"
      }
    });
  }

  increaseQuantity(): void {
    this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart(): void {
    this.cartService.addToCart(this.product, this.quantity);
  }

  buyNow(): void {
    this.addToCart();
    this.router.navigate(['/cart']);
  }

  openAddressForm(): void {
    this.isAddressFormVisible = true;
  }

  closeAddressForm(): void {
    this.isAddressFormVisible = false;
  }

  submitAddress(): void {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('Please login first.');
      this.router.navigate(['/login']);
      return;
    }

    const addressData = {
      ...this.newAddress,
      userId: parseInt(userId, 10)
    };

    // Save the address to the database
    this.http.post(this.addressApiUrl, addressData).subscribe({
      next: () => {
        alert('Address saved successfully!');
        this.fetchAddresses(); // Refresh the address list
        this.closeAddressForm();
      },
      error: (err) => {
        console.error('Error saving address:', err);
        alert('Failed to save the address. Please try again.');
      }
    });
  }

  updateLocalStorageWithAddress(): void {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('Please login first.');
      this.router.navigate(['/login']);
      return;
    }

    if (this.selectedAddress) {
      // Serialize the selected address object into a JSON string
      const serializedAddress = JSON.stringify(this.selectedAddress);

      // Save the serialized address in local storage
      localStorage.setItem(`selectedAddress`, serializedAddress);

      alert('Selected address updated in local storage!');
    }
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/images/default-product-image.jpg';
    img.onerror = null;
  }
}