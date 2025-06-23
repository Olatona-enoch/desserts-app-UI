import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CartItem } from 'src/app/services/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit {
  orderList: CartItem[] = [];
  amountToPay: number = 0;
  user: any;

  constructor(
    private cartService: CartService,
    private paymentService: PaymentService,
    private authService: AuthService
  ){}

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.user = user;
    });
    this.cartService.getCart().subscribe((orders) => {
      this.orderList = orders;
      this.amountToPay = this.cartService.getTotalPrice();
    });
  }
  


  pay() {
    console.log("making payment")
    const email = `${this.user.email}`;
    const amount = Math.round(this.amountToPay * 100 * 1550);
    const currency = 'NGN';
    this.paymentService.initializePayment(email, amount, currency).subscribe({
      next: (result: any) => {
        console.log("result" , result)
        console.log('Access code:', result.access_code);
        this.paymentService.openPaystackPopup(result.access_code);
      },
      error: (err) => {
        console.error('Error:', err);
        alert('Something went wrong. Please try again.');
      }
    });
  }

  // VerifyTransaction(){
  //   this.paymentService.verifyPayment('jjuuiuiioioi')
  // }
  

}
