import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from 'src/app/services/cart-item';
import { Product } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.css']
})
export class CartItemsComponent {
  @Output()
  removeItem: EventEmitter<CartItem> = new EventEmitter()
  @Input()
  item!: CartItem;

  removeFromCart(item: CartItem) {
    this.removeItem.emit(this.item);
  }


}
