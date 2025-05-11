import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'


@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor() { }

  addedToCart(){
    Swal.fire({
      position: 'bottom-end',
      icon: 'success',
      title: 'Added to cart',
      showConfirmButton: false,
      timer: 3000,
      toast: true,
    })

  }

}
