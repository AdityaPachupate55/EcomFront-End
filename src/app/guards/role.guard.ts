import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['role']; // Get the expected role from route data
    const userRole = this.authService.userDetails?.role || this.authService.adminDetails?.role;

    console.log('Expected Role:', expectedRole);
    console.log('User Role:', userRole);

    if (userRole === expectedRole) {
      return true; // Allow access if the role matches
    }

    // Redirect to a not-authorized page or login page
    alert('Access Denied: You do not have the required permissions.');
    this.router.navigate(['/']);
    return false;
  }
}
