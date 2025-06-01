import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  signedIn: boolean = false;
  signInForm!: FormGroup;
  showPassword: boolean = false;
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog
  ){}
  ngOnInit(): void {
   this.signInForm = this.fb.group (
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  signUp() {
    if(!this.signedIn){
      this.dialog.closeAll();
      this.dialog.open(SignUpComponent);
    }
    // this.dialog.open(SignUpComponent);
  }

  onSubmit() {
    if (this.signInForm.valid) {
      console.log("FORM DATA",this.signInForm.value);
      // this.dialogRef.close(this.signInForm.value);
    } else {
      this.signInForm.markAllAsTouched();
    }
  }

    toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }


}
