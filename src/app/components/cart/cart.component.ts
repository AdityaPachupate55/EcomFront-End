import { red } from './../../../../node_modules/@colors/colors/index.d';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService, CartItem } from '../../services/cart.service'
import { HeaderComponent } from "../../layout/header/header.component";
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NotifyService } from '../../services/notify.service';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterLink, FormsModule, HeaderComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  cartTotal = 0;
  shipping = 10.00;
  tax = 0;
  orderTotal = 0;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router,
    private notifyService: NotifyService
  ) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(cart => {
      this.cartItems = cart;
      this.calculateTotals();
    });
  }

  calculateTotals(): void {
    // Calculate subtotal
    this.cartTotal = this.cartItems.reduce((total, item) => total + item.subtotal, 0);

    // Calculate tax (e.g., 8%)
    this.tax = this.cartTotal * 0.08;

    // Calculate order total
    this.orderTotal = this.cartTotal + this.shipping + this.tax;
  }

  increaseQuantity(item: CartItem): void {
    if (item.quantity < (item.stock || 99)) { // Default max stock if not specified
      this.cartService.updateQuantity(item.id, item.quantity + 1);
    }
  }

  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      this.cartService.updateQuantity(item.id, item.quantity - 1);
    }
  }

  updateQuantity(item: CartItem): void {
    // Ensure quantity is within bounds
    if (item.quantity < 1) {
      item.quantity = 1;
    } else if (item.quantity > (item.stock || 99)) {
      item.quantity = item.stock || 99;
    }

    this.cartService.updateQuantity(item.id, item.quantity);
  }

  removeItem(item: CartItem): void {
    this.notifyService.confirmRemoveItem(item.name).then((confirmed) => {
      if (confirmed) {
        this.cartService.removeFromCart(item.id);
        this.notifyService.itemRemoved(item.name);
      }
    });
  }

  clearCart(): void {
    this.notifyService.confirmClearCart().then((confirmed) => {
      if (confirmed) {
        this.cartService.clearCart();
        this.notifyService.cartCleared();
      }
    });
  }

  categoryMap: { [key: number]: string } = {
    1: 'Analogue',
    2: 'Casual',
    3: 'Digital'
  };

  getCategoryName(categoryId: number): string {
    return this.categoryMap[categoryId] || 'Unknown';
  }

  proceedToCheckout(): void {
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      if (!isLoggedIn) {
        this.notifyService.userNotLoggedIn();
        // this.router.navigate(['/user-login']);
      } else {
        this.router.navigate(['/app-carttable-checktoproceed']);
      }
    });
  }
}



