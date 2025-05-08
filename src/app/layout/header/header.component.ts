import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLoggedIn = true;
  isAdmin = false;
  cartItemCount = 0;
  mobileMenuOpen = false;

  constructor(

  ) {}

  // ngOnInit() {
  //   this.authService.currentUser$.subscribe(user => {
  //     this.isLoggedIn = !!user;
  //     this.isAdmin = user?.role === 'ADMIN';
  //   });

  //   this.cartService.cart$.subscribe(cart => {
  //     this.cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);
  //   });
  // }

  // logout() {
  //   this.authService.logout();
  // }

  // toggleMobileMenu() {
  //   this.mobileMenuOpen = !this.mobileMenuOpen;
  // }
}