import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SwalService {

  constructor() { }

  success(message: string) {
    Swal.fire('Success', message, 'success');
  }

  error(message: string) {
    Swal.fire('Error', message, 'error');
  }

  warning(message: string) {
    Swal.fire('Warning', message, 'warning');
  }

  info(message: string) {
    Swal.fire('Info', message, 'info');
  }
}
