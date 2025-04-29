// src/app/services/alert.service.ts
import Swal from 'sweetalert2';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  success(message: string) {
    Swal.fire('Success', message, 'success');
  }

  error(message: string) {
    Swal.fire('Error', message, 'error');
  }

  info(message: string) {
    Swal.fire('Info', message, 'info');
  }

  warning(message: string) {
    Swal.fire('Warning', message, 'warning');
  }

  confirm(message: string, confirmButtonText = 'Yes', cancelButtonText = 'No') {
    return Swal.fire({
      title: 'Are you sure?',
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText,
    });
  }
}
