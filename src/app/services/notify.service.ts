import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
// import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor(private router: Router) { }

  addedToCart() {
    Swal.fire({
      position: 'bottom-end',
      icon: 'success',
      title: 'Added to cart',
      showConfirmButton: false,
      timer: 3000,
      toast: true,
    });
  }

  userNotLoggedIn() {
    Swal.fire({
      icon: 'error',
      title: '<span style="font-size: 24px; font-weight: 600; color: #484848;">Access Required</span>',
      text: 'You need to login first!',
      html: `
      <div style="margin: 20px 0;">
        <p style="color: #666; font-size: 16px; margin-bottom: 20px;">Please login to continue shopping</p>
        <button class="login-btn" style="
          background: linear-gradient(135deg, #3085d6, #2575c5);
          border: none;
          color: white;
          padding: 12px 24px;
          border-radius: 25px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(48, 133, 214, 0.2);
        ">
          Login Now
        </button>
      </div>
    `,
      showConfirmButton: false,
      background: '#fff',
      customClass: {
        popup: 'modern-popup rounded-popup'
      },
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      didRender: () => {
        document.querySelector('.login-btn')?.addEventListener('click', () => {
          Swal.close();
          this.router.navigate(['/user-login']);
        });
      }
    });
  }

  accessDenied() {
    Swal.fire({
      icon: 'error',
      title: '<span style="font-size: 24px; font-weight: 600; color: #484848;">Access Denied</span>',
      html: `
        <div style="margin: 20px 0;">
          <p style="color: #666; font-size: 16px; margin-bottom: 20px;">You don't have the required permissions to access this page.</p>
          <button class="home-btn" style="
            background: linear-gradient(135deg, #d33, #c62828);
            border: none;
            color: white;
            padding: 12px 24px;
            border-radius: 25px;
            font-size: 16px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(211, 51, 51, 0.2);
          ">
            Return to Home
          </button>
        </div>
      `,
      showConfirmButton: false,
      background: '#fff',
      customClass: {
        popup: 'modern-popup rounded-popup'
      },
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      didRender: () => {
        document.querySelector('.home-btn')?.addEventListener('click', () => {
          Swal.close();
          this.router.navigate(['/']);
        });
      }
    });
  }

  successLogin(){
    Swal.fire({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      icon: "success",
      timerProgressBar: true,
      title: "Login Successful",
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
    });
  }

  succesLogout(){
    Swal.fire({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      icon: "success",
      timerProgressBar: true,
      title: "Logout Successful",
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
    });
  }

  errorLogin(){
    Swal.fire({
      toast: true,
      position: "top-end",
      text:'Check Credentials!',
      showConfirmButton: false,
      timer: 3000,
      icon: "error",
      timerProgressBar: true,
      title: "Login Failed",
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
    });
  }

  errorLogout(){
    Swal.fire({
      toast: true,
      position: "top-end",
      text:'Check Credentials!',
      showConfirmButton: false,
      timer: 3000,
      icon: "error",
      timerProgressBar: true,
      title: "Logout Failed",
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
    });
  }

  successRegistration(){
    Swal.fire({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      icon: "success",
      timerProgressBar: true,
      title: "Registration Successful",
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
    });
  }

  errorRegistration(){
    Swal.fire({
      toast: true,
      position: "top-end",
      text:'Check Credentials!',
      showConfirmButton: false,
      timer: 3000,
      icon: "error",
      timerProgressBar: true,
      title: "Registration Failed",
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
    });
  }

  confirmClearCart(): Promise<boolean> {
    return Swal.fire({
      title: 'Clear Cart?',
      text: 'Are you sure you want to remove all items from your cart?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, clear it!',
      cancelButtonText: 'No, keep it',
      background: '#fff',
      customClass: {
        popup: 'modern-popup rounded-popup'
      },
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Cart Cleared!',
          text: 'Your cart has been emptied.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
        return true;
      }
      return false;
    });
  }

  cartCleared() {
    Swal.fire({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000,
      icon: 'success',
      timerProgressBar: true,
      title: 'Cart cleared successfully',
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
  }

  confirmRemoveItem(itemName: string): Promise<boolean> {
    return Swal.fire({
      title: 'Remove Item?',
      text: `Are you sure you want to remove ${itemName} from your cart?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'No, keep it',
      background: '#fff',
      customClass: {
        popup: 'modern-popup rounded-popup'
      },
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    }).then((result) => result.isConfirmed);
  }

  itemRemoved(itemName: string) {
    Swal.fire({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000,
      icon: 'success',
      timerProgressBar: true,
      title: `${itemName} removed from cart`,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
  }

  paymentStatusUpdated() {
    Swal.fire({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000,
      icon: 'success',
      timerProgressBar: true,
      title: 'Payment status updated successfully',
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
  }

  paymentStatusUpdateFailed() {
    Swal.fire({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000,
      icon: 'error',
      timerProgressBar: true,
      title: 'Failed to update payment status',
      text: 'Please check the input and try again',
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
  }

  orderStatusUpdated() {
    Swal.fire({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000,
      icon: 'success',
      timerProgressBar: true,
      title: 'Order status updated successfully',
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
  }

  orderStatusUpdateFailed() {
    Swal.fire({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000,
      icon: 'error',
      timerProgressBar: true,
      title: 'Failed to update order status',
      text: 'Please check the input and try again',
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
  }

  confirmDeleteOrder(): Promise<boolean> {
    return Swal.fire({
      title: 'Delete Order?',
      text: 'Are you sure you want to delete this order? This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
      background: '#fff',
      customClass: {
        popup: 'modern-popup rounded-popup'
      },
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    }).then((result) => result.isConfirmed);
  }

  orderDeleted() {
    Swal.fire({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000,
      icon: 'success',
      timerProgressBar: true,
      title: 'Order deleted successfully',
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
  }

  orderDeletionFailed() {
    Swal.fire({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000,
      icon: 'error',
      timerProgressBar: true,
      title: 'Failed to delete order',
      text: 'Please try again',
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
  }

  confirmDeleteProduct(productName: string): Promise<boolean> {
    return Swal.fire({
      title: 'Delete Product?',
      text: `Are you sure you want to delete ${productName}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
      background: '#fff',
      customClass: {
        popup: 'modern-popup rounded-popup'
      },
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    }).then((result) => result.isConfirmed);
  }

  productDeleted() {
    Swal.fire({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000,
      icon: 'success',
      timerProgressBar: true,
      title: 'Product deleted successfully',
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
  }

  productAdded() {
    Swal.fire({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000,
      icon: 'success',
      timerProgressBar: true,
      title: 'Product added successfully',
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
  }

  productUpdated() {
    Swal.fire({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000,
      icon: 'success',
      timerProgressBar: true,
      title: 'Product updated successfully',
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
  }

  operationFailed(operation: string, error: string) {
    Swal.fire({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000,
      icon: 'error',
      timerProgressBar: true,
      title: `Failed to ${operation}`,
      text: error,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
  }

  confirmDeleteUser(userName: string): Promise<boolean> {
    return Swal.fire({
      title: 'Delete User?',
      text: `Are you sure you want to delete ${userName}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete user',
      cancelButtonText: 'Cancel',
      background: '#fff',
      customClass: {
        popup: 'modern-popup rounded-popup'
      },
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    }).then((result) => result.isConfirmed);
  }

  userDeleted() {
    Swal.fire({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000,
      icon: 'success',
      timerProgressBar: true,
      title: 'User deleted successfully',
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
  }

  userDeletionFailed() {
    Swal.fire({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000,
      icon: 'error',
      timerProgressBar: true,
      title: 'Failed to delete user',
      text: 'Please try again later',
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
  }

  orderPlacedSuccess() {
    Swal.fire({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000,
      icon: 'success',
      timerProgressBar: true,
      title: 'Order placed successfully!',
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
  }

  orderProcessingFailed() {
    Swal.fire({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000,
      icon: 'error',
      timerProgressBar: true,
      title: 'Failed to process order',
      text: 'Please try again',
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
  }

  addressRequired() {
    Swal.fire({
      icon: 'warning',
      title: 'Address Required',
      text: 'Please select a delivery address',
      confirmButtonColor: '#3085d6',
      background: '#fff',
      customClass: {
        popup: 'modern-popup rounded-popup'
      }
    });
  }

  addressUpdated() {
    Swal.fire({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000,
      icon: 'success',
      timerProgressBar: true,
      title: 'Address updated successfully',
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
  }

  addressUpdateFailed() {
    Swal.fire({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000,
      icon: 'error',
      timerProgressBar: true,
      title: 'Failed to update address',
      text: 'Please try again',
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
  }

  newAddressAdded() {
    Swal.fire({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000,
      icon: 'success',
      timerProgressBar: true,
      title: 'New address added successfully',
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
  }

  addressAddFailed() {
    Swal.fire({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000,
      icon: 'error',
      timerProgressBar: true,
      title: 'Failed to add new address',
      text: 'Please check your input and try again',
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
  }

  productDetailsFetchFailed() {
    Swal.fire({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000,
      icon: 'error',
      timerProgressBar: true,
      title: 'Failed to fetch product details',
      text: 'Please try again later',
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
  }

  addressSaved() {
    Swal.fire({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000,
      icon: 'success',
      timerProgressBar: true,
      title: 'Address saved successfully',
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
  }

  addressSelected() {
    Swal.fire({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000,
      icon: 'success',
      timerProgressBar: true,
      title: 'Delivery address updated',
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
  }
}