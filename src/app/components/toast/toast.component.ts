import { Component, OnInit } from '@angular/core';

interface ToastDetail {
  icon: string;
  text: string;
}

interface ToastDetails {
  timer: number;
  success: ToastDetail;
  error: ToastDetail;
  warning: ToastDetail;
  info: ToastDetail;
}

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {
  private toastDetails: ToastDetails = {
    timer: 5000,
    success: {
      icon: 'fa-circle-check',
      text: 'Success: This is a success toast.',
    },
    error: {
      icon: 'fa-circle-xmark',
      text: 'Error: This is an error toast.',
    },
    warning: {
      icon: 'fa-triangle-exclamation',
      text: 'Warning: This is a warning toast.',
    },
    info: {
      icon: 'fa-circle-info',
      text: 'Info: This is an information toast.',
    }
  };

  ngOnInit(): void {
    // Add Font Awesome CDN to head
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css';
    document.head.appendChild(link);
  }

  createToast(id: 'success' | 'error' | 'warning' | 'info'): void {
    const notifications = document.querySelector('.notifications');
    if (!notifications) return;

    const { icon, text } = this.toastDetails[id];
    const toast = document.createElement('li');
    toast.className = `toast ${id}`;

    toast.innerHTML = `
      <div class="column">
        <i class="fa-solid ${icon}"></i>
        <span>${text}</span>
      </div>
      <i class="fa-solid fa-xmark"></i>
    `;

    notifications.appendChild(toast);

    // Add click event to close button
    const closeButton = toast.querySelector('.fa-xmark');
    if (closeButton) {
      closeButton.addEventListener('click', () => this.removeToast(toast));
    }

    // Auto remove toast
    const timeoutId = setTimeout(() => this.removeToast(toast), this.toastDetails.timer);
    (toast as any).timeoutId = timeoutId;
  }

  private removeToast(toast: HTMLElement): void {
    toast.classList.add('hide');
    if ((toast as any).timeoutId) clearTimeout((toast as any).timeoutId);
    setTimeout(() => toast.remove(), 500);
  }
}
