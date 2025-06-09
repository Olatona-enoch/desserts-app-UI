import { Component, Input } from '@angular/core';
import { CartItem } from 'src/app/services/cart-item';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent {

  @Input()
  orders!: CartItem;

}
