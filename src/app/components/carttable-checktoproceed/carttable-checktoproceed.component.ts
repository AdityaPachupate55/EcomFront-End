import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../../services/cart.service';
import { HttpClient } from '@angular/common/http';

interface CartPostItem {
  cartItemID: number;
  productId: number;
  userId: number;
  quantity: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  totalPrice: number;
}
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { HeaderComponent } from "../../layout/header/header.component";

@Component({
  selector: 'app-carttable-checktoproceed',
  templateUrl: './carttable-checktoproceed.component.html',
  styleUrls: ['./carttable-checktoproceed.component.css'],
  imports: [CommonModule, HeaderComponent]
})
export class CarttableChecktoproceedComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalItems: number = 0;
  orderConfirmed: boolean = false;

  constructor(
    private cartService: CartService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(cart => {
      this.cartItems = cart;
      this.totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      this.proceedToCheckout();
    });
  }

  proceedToCheckout(): void {
    if (this.cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
  
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('Please login first');
      this.router.navigate(['/login']);
      return;
    }
  
    const formattedCartItems: CartPostItem[] = this.cartItems.map(item => ({
      cartItemID: 0,
      productId: parseInt(item.id.toString()),
      userId: parseInt(userId),
      quantity: parseInt(item.quantity.toString()),
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      totalPrice: Math.round(item.price * item.quantity) // Convert to integer
    }));
  
    console.log('Cart items to process:', formattedCartItems);
  
    // Process items one by one
    let successCount = 0;
    let errorCount = 0;
  
    formattedCartItems.forEach((item, index) => {
      this.cartService.postCartItems([item]).subscribe({
        next: (response) => {
          console.log(`Item ${index + 1} added successfully:`, response);
          successCount++;
          if (successCount + errorCount === formattedCartItems.length) {
            if (successCount === formattedCartItems.length) {
              this.orderConfirmed = true;
              // this.cartService.clearCart();
              alert('All items added to cart successfully!');
              this.router.navigate(['/order-confirmation']);
            } else {
              alert(`${successCount} items added, ${errorCount} failed`);
            }
          }
        },
        error: (err) => {
          console.error(`Error adding item ${index + 1}:`, err);
          errorCount++;
          if (successCount + errorCount === formattedCartItems.length) {
            alert(`${successCount} items added, ${errorCount} failed`);
          }
        }
      });
    });
  } 
  getSubtotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }  
  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  } 
  confirmOrder(): void {
    const userId = localStorage.getItem('userId');
    const selectedAddressStr = localStorage.getItem('selectedAddress');
    
    if (!userId || !selectedAddressStr) {
      alert('Please login and select a delivery address');
      return;
    }
  
    try {
      const selectedAddress = JSON.parse(selectedAddressStr);
      const formattedAddress = `${selectedAddress.addressLine1}, ${selectedAddress.addressLine2}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country} - ${selectedAddress.postalCode}`;
  
      const orderData = {
        orderID: 0,  // Will be auto-incremented by database
        userID: parseInt(userId),
        totalPrice: this.getTotal(),
        shippingAddress: formattedAddress,
        orderStatus: "NA",
        paymentStatus: "NA"
      };
  
      this.http.post('https://localhost:7194/api/Orders', orderData).subscribe({
        next: (response) => {
          console.log('Order created successfully:', response);
          alert('Order placed successfully!');
          this.cartService.clearCart();
          this.router.navigate(['/order-confirmation']);
        },
        error: (error) => {
          console.error('Error creating order:', error);
          alert('Failed to place order. Please try again.');
        }
      });
  
    } catch (error) {
      console.error('Error processing order:', error);
      alert('Error processing order. Please try again.');
    }
  }

}
