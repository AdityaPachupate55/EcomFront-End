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

}