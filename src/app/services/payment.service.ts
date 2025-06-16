import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import PaystackPop from '@paystack/inline-js'

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) {}

  // Ask the server to create a transaction and return the access code
  initializePayment(email: string, amount: number, currency:string) {
    return this.http.post('http://localhost:5000/api/initialize-payment', { email, amount, currency });
  }

  // Open Paystack popup
  openPaystackPopup(access_code: string) {
    const popup = new PaystackPop();
    // popup.resumeTransaction(access_code)

    popup.newTransaction({
      accessCode: access_code,
      onSuccess: (response) => {
        console.log('Payment successful:', response);
        alert(`Payment successful! Reference: ${response.reference}`);
      },
      onCancel: () => {
        console.log('Payment cancelled');
        alert('Payment was cancelled.');
      }
    });
  }
}
