import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignInComponent } from 'src/app/pages/sign-in/sign-in.component';
import { SignUpComponent } from 'src/app/pages/sign-up/sign-up.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  signedIn: boolean = false;

  constructor(
    public dialog: MatDialog
  ){}


  openDialog() {
    if(this.signedIn){}
    this.dialog.open(SignInComponent);
    // this.dialog.open(SignUpComponent);
  }

}
