import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/services/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit {
  orderList: CartItem[] = [];
  amountToPay: number = 0;

  constructor(
    private cartService: CartService,
  ){}

  ngOnInit() {
    this.cartService.getCart().subscribe((orders) => {
      this.orderList = orders;
      this.amountToPay = this.cartService.getTotalPrice();

    });
  }
}
