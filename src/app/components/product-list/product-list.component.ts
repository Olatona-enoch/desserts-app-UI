import { Component, Input } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  @Input()
  product!: Product;
  itemAtZero: boolean = true;
  quantity: number = 0;

  constructor(
    private cartService: CartService
  ){}
  
  ngOnInit() {
    this.cartService.getCart().subscribe(cartItems => {
      const item = cartItems.find(items => items.product.id === this.product.id);
      this.quantity = item ? item.quantity : 0;
      this.itemAtZero = this.quantity === 0;
    });
  }

  addtocart(product: Product){
    this.itemAtZero = false;
    this.quantity++;
    this.cartService.addToCart(this.product);
  }

  decrease(product: Product){
    if (this.quantity == 1) {
      // this.quantity = 0;
      // this.itemAtZero = true;
      this.cartService.removeFromCart(product)
    } else {
      this.quantity--;
      this.cartService.decreaseItem(this.product);
    }
  }

}
