import { Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Product {
  id?: number;
  image?: string;
  name: string;
  variation: string;
  price: number;
}


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private firestore: Firestore
  ) { }

  getProducts(): Observable<Product[]> {
    const productsRef = collection(this.firestore, 'products');
    return collectionData(productsRef, { idField: 'id' }) as Observable<Product[]>;
  }
}
