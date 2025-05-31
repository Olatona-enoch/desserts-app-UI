import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignInComponent } from 'src/app/pages/sign-in/sign-in.component';
import { CartItem } from 'src/app/services/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
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
