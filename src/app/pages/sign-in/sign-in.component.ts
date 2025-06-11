import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  signedIn: boolean = false;
  signInForm!: FormGroup;
  showPassword: boolean = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private authService: AuthService,
    private dialogRef: MatDialogRef<SignInComponent>,
    private toastr: ToastrService
  ){}

  ngOnInit(): void {
   this.signInForm = this.fb.group (
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  async onSubmit() {
    if (this.signInForm.invalid) {
      this.signInForm.markAllAsTouched();
      return;
    }
    const formData = this.signInForm.value;
    const userCredentials : any = {
      email: formData.email,
      password: formData.password
    };
    
    try {
      await this.authService.signIn(userCredentials.email, userCredentials.password);
      setTimeout(() => {
        this.dialogRef.close();
        this.onLoginSuccess();
      },300);
      // Close the modal if login succeeds
    } catch (error: any) {
      this.onLoginError(error);
      console.error('Sign-in error:', error);
      this.errorMessage = error.message;
      setTimeout(() => {
        this.errorMessage = '';
      },1200);
    }
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  onLoginSuccess() {
    this.toastr.success('You have successfully signed in!', 'Welcome');
  }

  onLoginError(error: string) {
    this.toastr.error(error, 'Login Failed');
  }

  signUp() {
    console.log("signup link clicked")
    this.dialog.closeAll();
    this.dialog.open(SignUpComponent, {
      maxWidth: '95vw',
    });
  }


}
