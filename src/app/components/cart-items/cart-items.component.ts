import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from 'src/app/services/cart-item';
import { Product } from 'src/app/services/product.service';
import { trigger, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.css'],
  animations: [
    trigger('cartItem', [
      transition(':enter', [
        style({ transform: 'translateX(30px)', opacity: 0 }),
        animate('250ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateX(4000px)', opacity: 0 }))
      ])
    ])
  ]
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
