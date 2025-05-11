import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NotifyService } from '../services/notify.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private notifyService: NotifyService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['role'];
    const userRole = this.authService.userDetails?.role || this.authService.adminDetails?.role;

    console.log('Expected Role:', expectedRole);
    console.log('User Role:', userRole);

    if (userRole === expectedRole) {
      return true;
    }

    this.notifyService.accessDenied();
    return false;
  }
}
