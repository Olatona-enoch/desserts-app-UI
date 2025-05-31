import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  signedIn: boolean = false;
  constructor(
    private dialog: MatDialog
  ){}

    signUp() {
    if(!this.signedIn){
      this.dialog.closeAll();
      this.dialog.open(SignUpComponent);
    }
    // this.dialog.open(SignUpComponent);
  }


}
