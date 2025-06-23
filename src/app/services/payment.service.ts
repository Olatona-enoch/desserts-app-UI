import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import PaystackPop from '@paystack/inline-js'
import { CartService } from './cart.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  reference: any ;
  constructor(
    private http: HttpClient,
    private cartService: CartService,
    private dialog: MatDialog,
    private toastr: ToastrService
    
  ) {}

  // Ask the server to create a transaction and return the access code
  initializePayment(email: string, amount: number, currency:string) {
    return this.http.post('http://localhost:5000/api/initialize-payment', { email, amount, currency });
  }

  verifyPayment(reference: string) {
    this.http.post<any>('http://localhost:5000/api/verify-payment', { reference })
      .subscribe({
        next: res => {
          if (res.data.status) {
            // this.toastr.success('Payment verified successfully!');
            console.log("result:", res)
            this.reset();
          } else {
            // this.toastr.error(res.message);
            console.log("result:", res)
          }
        },
        error: err => {
          console.error('Verification error:', err);
          this.toastr.error('Could not verify payment. Please try again.');
        }
      });
    } 

  // Open Paystack popup
  openPaystackPopup(access_code: string) {
    const popup = new PaystackPop();
    // popup.resumeTransaction(access_code)

    popup.newTransaction({
      accessCode: access_code,
      onSuccess: (response) => {
        // console.log('Payment successful:', response);
        // alert(`Payment successful! Reference: ${response.reference}`);
        this.reference = response.reference;
        this.verifyPayment(this.reference);
        // setTimeout(() => {
        //   this.reset();
            
        // }, 1000);
      },
      onCancel: () => {
        console.log('Payment cancelled');
        // alert('Payment was cancelled.');
        this.onPaymentError();
      }
    });
  }

  reset(){
    this.dialog.closeAll();
    this.cartService.clearCart();
    this.onPaymentSuccess();
  }
  onPaymentSuccess() {
    this.toastr.success('Payment Successfull');
  }

  onPaymentError() {
    this.toastr.error('Payment Cancelled');
  }

}
