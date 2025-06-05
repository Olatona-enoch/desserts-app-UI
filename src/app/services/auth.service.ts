import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User } from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>(null);
  public user$ = this.currentUserSubject.asObservable();

  constructor(
    private auth: Auth, 
    private firestore: Firestore
  ) { 
    onAuthStateChanged(this.auth, async user => {
      if (user) {
        const userDoc = await getDoc(doc(this.firestore, 'users', user.uid));
        this.currentUserSubject.next(userDoc.data());
      } else {
        this.currentUserSubject.next(null);
      }
    });
  }

  async signUp(userData: { firstName: string, lastName: string, email: string, phone: string }, password: string) {
    const userCredentials = await createUserWithEmailAndPassword(this.auth, userData.email, password);
    const uid = userCredentials.user.uid;

    await setDoc(doc(this.firestore, 'users', uid), {
      uid,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone
    });
  }

  async signIn(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  async logout() {
    await signOut(this.auth);
  }

  getCurrentUser() {
    return this.currentUserSubject.value;
  }
}
