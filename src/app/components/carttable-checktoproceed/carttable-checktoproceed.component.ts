import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../../services/cart.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { HeaderComponent } from "../../layout/header/header.component";
import { NotifyService } from '../../services/notify.service';

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

@Component({
  selector: 'app-carttable-checktoproceed',
  templateUrl: './carttable-checktoproceed.component.html',
  styleUrls: ['./carttable-checktoproceed.component.css'],
  imports: [CommonModule, HeaderComponent , RouterLinkActive , RouterLink]
})
export class CarttableChecktoproceedComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalItems: number = 0;
  orderConfirmed: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private cartService: CartService,
    private router: Router,
    private http: HttpClient,
    private authService: AuthService,
    private notifyService: NotifyService
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
      this.errorMessage = 'Your cart is empty!';
      return;
    }

    const userId = localStorage.getItem('userId');
    if (!userId) {
      this.errorMessage = 'Please login first';
      this.router.navigate(['/login']);
      return;
    }

  const formattedCartItems: CartPostItem[] = this.cartItems.map(item => ({
      cartItemID: 0,
      productId: parseInt(item.id.toString()),
      userId: parseInt(userId),
      quantity: parseInt(item.quantity.toString()),
      isActive: false,
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
              this.successMessage = 'All items added to cart successfully!';
              this.router.navigate(['/order-confirmation']);
            } else {
              this.errorMessage = `${successCount} items added, ${errorCount} failed`;
            }
          }
        },
        error: (err) => {
          console.error(`Error adding item ${index + 1}:`, err);
          errorCount++;
          if (successCount + errorCount === formattedCartItems.length) {
            this.errorMessage = `${successCount} items added, ${errorCount} failed`;
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
  this.authService.isLoggedIn$.subscribe(isLoggedIn => {
    if (!isLoggedIn) {
      this.notifyService.userNotLoggedIn();
      return;
    }

    const userId = localStorage.getItem('userId');
    const selectedAddressStr = localStorage.getItem('selectedAddress');
    if (!userId || !selectedAddressStr) {
      this.notifyService.addressRequired();
      return;
    }

    try {
      const selectedAddress = JSON.parse(selectedAddressStr);
      const formattedAddress = `${selectedAddress.addressLine1}, ${selectedAddress.addressLine2}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country} - ${selectedAddress.postalCode}`;

      // First update all cart items to inactive
      const updatePromises = this.cartItems.map(item => {
        const updateData = {
          cartItemID: item.id,
          productId: item.id,
          userId: parseInt(userId),
          quantity: item.quantity,
          isActive: false,
          updatedAt: new Date().toISOString(),
          totalPrice: Math.round(item.price * item.quantity)
        };
        return this.http.put(`https://localhost:7194/api/Cart/${item.id}`, updateData).toPromise();
      });

      // After all cart items are updated, create the order
      Promise.all(updatePromises)
        .then(() => {
          const orderData = {
            orderID: 0,
            userID: parseInt(userId),
            totalPrice: this.getTotal(),
            shippingAddress: formattedAddress,
            orderStatus: "Pending",
            paymentStatus: "Unpaid"
          };

          return this.http.post('https://localhost:7194/api/Orders', orderData).toPromise();
        })
        .then((response) => {
          console.log('Order created successfully:', response);
          this.notifyService.orderPlacedSuccess();
          this.cartService.clearCart();
          this.router.navigate(['/order-confirmation']);
        })
        .catch((error) => {
          console.error('Error processing order:', error);
          this.notifyService.orderProcessingFailed();
        });

    } catch (error) {
      console.error('Error processing order:', error);
      this.notifyService.orderProcessingFailed();
    }
  });
 }

}
