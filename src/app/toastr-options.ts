import { Injectable } from '@angular/core';
import { ToastOptions } from 'ng2-toastr';

@Injectable()
export class ToastrOptions extends ToastOptions {
    showCloseButton = true;
    positionClass = 'toast-top-full-width';
    toastLife = 3000;
}
