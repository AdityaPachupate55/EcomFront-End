import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLoggedIn = false; // Default to false
  isAdmin = false;
  cartItemCount = 0;
  mobileMenuOpen = false;

  constructor(
    private authService: AuthService,
    private cartService: CartService

  ) {}

  ngOnInit() {
    // Subscribe to the isLoggedIn$ observable to track login status
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      this.isAdmin = this.authService.adminDetails?.role === 'ADMIN'; // Check admin role
    });

    this.cartService.cart$.subscribe(cart => {
      this.cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);
    });
  }

  logout() {
    this.authService.logout(); // Call logout from AuthService
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
}