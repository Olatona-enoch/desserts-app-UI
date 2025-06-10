import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignInComponent } from 'src/app/pages/sign-in/sign-in.component';
import { SignUpComponent } from 'src/app/pages/sign-up/sign-up.component';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { trigger, transition, style, animate, keyframes } from '@angular/animations';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
    trigger('navBounce', [
      transition(':enter', [
        animate('700ms ease-out', keyframes([
          style({ transform: 'translateY(-100%)', opacity: 0, offset: 0 }),
          style({ transform: 'translateY(20%)', opacity: 1, offset: 0.6 }),
          style({ transform: 'translateY(-10%)', offset: 0.8 }),
          style({ transform: 'translateY(0)', offset: 1 }),
        ]))
      ])
    ])
  ]
})
export class NavbarComponent {
  signedIn: boolean = false;
  user$ = this.authService.user$;


  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private toastr: ToastrService
  ){}

  logout() {
    this.authService.logout();
    this.toastr.success('You have successfully Logged Out !');

  }
  testtoaster() {
    this.toastr.error('You have successfully Logged Out !');

  }



  openDialog() {
    if(this.signedIn){}
    this.dialog.open(SignInComponent, {
      maxWidth: '100vw',
    });
    // this.dialog.open(SignUpComponent);
  }

}
