import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignInComponent } from 'src/app/pages/sign-in/sign-in.component';
import { CartItem } from 'src/app/services/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/services/product.service';
import { trigger, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('500ms ease-out', style({ transform: 'translateX(0%)' }))
      ]),
      transition(':leave', [
        animate('500ms ease-in', style({ transform: 'translateX(-100%)' }))
      ])
    ]),
    trigger('cartCountChange', [
      transition('* => *', [
        animate('100ms ease-out', style({ transform: 'scale(1.2)' })),
        animate('100ms ease-in', style({ transform: 'scale(1)' }))
      ])
    ])



  ],
})
export class CartComponent implements OnInit {
  empty: boolean = true;

  cartItems: CartItem[] = [];
  totalQuantity: number = 0;
  totalPrice: number = 0;
  signedIn: boolean = false;

  constructor(
    private cartService: CartService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.cartService.getCart().subscribe((items) => {
      this.cartItems = items;
      this.empty = this.cartItems.length === 0;
      this.updateCalculations();
    });
  }

  onRemoveItem( item: Product) {
    this.cartService.removeFromCart(item)
  }

  updateCalculations(){
    this.totalQuantity = this.cartService.getTotalQuantity();
    this.totalPrice = this.cartService.getTotalPrice();
  }

  openDialog() {
    if(!this.signedIn){
      this.dialog.open(SignInComponent);
    }
    // this.dialog.open(SignUpComponent);
  }
  

}
