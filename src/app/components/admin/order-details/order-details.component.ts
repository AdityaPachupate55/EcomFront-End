import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { catchError, throwError, forkJoin } from 'rxjs';
import { NotifyService } from '../../../services/notify.service';
interface Order {
  orderID: number;
  userID: number;
  totalPrice: number;
  shippingAddress: string;
  orderStatus: string;
  paymentStatus: string;
  lastUpdated?: Date;
}

interface OrderStatusUpdate {
  orderStatus: string;
}

interface PaymentStatusUpdate {
  paymentStatus: string;
}

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  orders: Order[] = [];
  apiUrl = 'https://localhost:7194/api/Orders';
  loading = false;
  error: string | null = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private notifyService: NotifyService // Assuming notifyService is injected
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.status === 401) {
      errorMessage = 'Session expired. Please login again';
      localStorage.removeItem('admin_token');
      this.router.navigate(['/admin-login']);
    }
    return throwError(() => errorMessage);
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      this.router.navigate(['/admin-login']);
      return new HttpHeaders();
    }
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  loadOrders(): void {
    this.loading = true;
    this.error = null;
    const headers = this.getHeaders();

    this.http.get<Order[]>(this.apiUrl, { headers })
      .pipe(catchError(this.handleError.bind(this)))
      .subscribe({
        next: (data) => {
          this.orders = data;
          this.loading = false;
        },
        error: (error) => {
          this.error = error;
          this.loading = false;
          console.error('Error fetching orders:', error);
        }
      });
  }

  updateOrderStatus(orderId: number, orderStatus: string): void {
    const url = `${this.apiUrl}/${orderId}/status`;
    const headers = this.getHeaders().set('Content-Type', 'application/json');

    console.log('Updating order status:', { url, orderStatus });

    this.http.put(url, JSON.stringify(orderStatus), { headers })
      .pipe(catchError(this.handleError.bind(this)))
      .subscribe({
        next: () => {
          console.log('Order status updated successfully');
          this.notifyService.orderStatusUpdated();
          this.loadOrders();
        },
        error: (err) => {
          console.error('Error updating order status:', err);
          this.notifyService.orderStatusUpdateFailed();
          this.error = 'Failed to update order status. Please check the input and try again.';
        }
      });
  }

  updatePaymentStatus(orderId: number, paymentStatus: string): void {
    const url = `${this.apiUrl}/${orderId}/payment`;
    const headers = this.getHeaders().set('Content-Type', 'application/json');

    console.log('Updating payment status:', { url, paymentStatus });

    this.http.put(url, JSON.stringify(paymentStatus), { headers })
      .pipe(catchError(this.handleError.bind(this)))
      .subscribe({
        next: () => {
          console.log('Payment status updated successfully');
          this.notifyService.paymentStatusUpdated();
          this.loadOrders();
        },
        error: (err) => {
          console.error('Error updating payment status:', err);
          this.notifyService.paymentStatusUpdateFailed();
          this.error = 'Failed to update payment status. Please check the input and try again.';
        }
      });
  }

  deleteOrder(orderId: number): void {
    const url = `${this.apiUrl}/${orderId}`;
    const headers = this.getHeaders();

    this.notifyService.confirmDeleteOrder().then((confirmed) => {
      if (confirmed) {
        this.http.delete(url, { headers })
          .pipe(catchError(this.handleError.bind(this)))
          .subscribe({
            next: () => {
              console.log('Order deleted successfully');
              this.notifyService.orderDeleted();
              this.loadOrders();
            },
            error: (err) => {
              console.error('Error deleting order:', err);
              this.notifyService.orderDeletionFailed();
              this.error = 'Failed to delete order. Please try again.';
            }
          });
      }
    });
  }

  saveChanges(order: Order): void {
    const url = `${this.apiUrl}/${order.orderID}`;
    const headers = this.getHeaders().set('Content-Type', 'application/json'); // Set Content-Type

    console.log('Saving order changes:', { url, order }); // Debugging log

    this.http.put(url, JSON.stringify(order), { headers }) // Send order as JSON string
      .pipe(catchError(this.handleError.bind(this)))
      .subscribe({
        next: () => {
          console.log('Order changes saved successfully');
          alert('Order changes saved successfully');
          this.loadOrders();
        },
        error: (err) => {
          console.error('Error saving changes:', err);
          this.error = 'Failed to save changes. Please check the input and try again.';
        }
      });
  }
}
