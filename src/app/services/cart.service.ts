import { Injectable } from '@angular/core';
import { Product } from './product.service';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from './cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // private cart: [] = [];
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([])

  constructor(
  ) { }

  getCart() {
    return this.cartSubject.asObservable();
  }

  addToCart(product: Product) {
    const existingItem = this.cartItems.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
      existingItem.fullPrice = existingItem.quantity * (existingItem.product.price);
    } else {
      this.cartItems.push({ product, quantity: 1, fullPrice:1 * product.price });
    }
    // this.cartItems.push(product);
    this.cartSubject.next([...this.cartItems]);
  }

  decreaseItem(product: Product){
    const existingItem = this.cartItems.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity--;
      existingItem.fullPrice = existingItem.quantity * (existingItem.product.price);
    } else {
      this.cartItems.push({ product, quantity: 1, fullPrice: product.price });
    }
    // this.cartItems.push(product);
    this.cartSubject.next([...this.cartItems]);

  }

  removeFromCart(product: Product){
    this.cartItems = this.cartItems.filter(item => item.product.id !== product.id);
    this.cartSubject.next([...this.cartItems]);
  }

  getTotalQuantity(): number {
    return this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((sum, item) => sum + item.fullPrice, 0);
  }

  clearCart() {
    this.cartItems = [];
    this.cartSubject.next([]);
  }
}
