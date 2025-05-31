import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductButtonComponent } from './components/product-button/product-button.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { OrderConfirmationComponent } from './modal/components/order-confirmation/order-confirmation.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { CartItemsComponent } from './components/cart-items/cart-items.component';
import { HomeComponent } from './pages/home/home.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

const firebase = {
  apiKey: "AIzaSyAE8E_q5JS8AzOgBG38pL3m6dNo8AWdZLk",
  authDomain: "fir-demo-54d10.firebaseapp.com",
  databaseURL: "https://fir-demo-54d10-default-rtdb.firebaseio.com",
  projectId: "fir-demo-54d10",
  storageBucket: "fir-demo-54d10.firebasestorage.app",
  messagingSenderId: "779672758567",
  appId: "1:779672758567:web:7b2805e4d41a6f0dae2102",
  measurementId: "G-RWG8X1C9JW"
};


@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    ProductButtonComponent,
    ProductListComponent,
    OrderConfirmationComponent,
    CartItemsComponent,
    HomeComponent,
    SignInComponent,
    NavbarComponent,
    SignUpComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(firebase)),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
