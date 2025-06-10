import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { SignInComponent } from '../sign-in/sign-in.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm!:FormGroup
  showPassword: boolean = false;
  errorMessage: string = '';

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private authService: AuthService,
    private dialogRef: MatDialogRef<SignUpComponent>,
    private toastr: ToastrService
  ){}

  ngOnInit(): void {
    this.signUpForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10,}$/)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: [{ value: '', disabled: true }, Validators.required]
      },
      {
        validators: this.passwordMatchValidator
      }
    );
    this.signUpForm.get('password')?.valueChanges.subscribe(password => {
      const confirmPasswordControl = this.signUpForm.get('confirmPassword');

      if (!password) {
        confirmPasswordControl?.disable();
      } else {
        confirmPasswordControl?.enable();
      }
    });
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  async onSubmit() {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      this.onLoginError();
      return;
    }
    const formData = this.signUpForm.getRawValue();
    const userDetails: any = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      email: formData.email
    };
    const password = formData.password;

    try {
      await this.authService.signUp(userDetails, password);
      this.dialogRef.close(); // Close modal
      this.onLoginSuccess();
    } catch (error: any) {
      this.errorMessage = error.message;
    }

    // const formData = this.signUpForm.value;
    console.log('Form data:', formData);
  }

  onLoginSuccess() {
  this.toastr.success('You have successfully signed Up!', 'Welcome');
  }

  onLoginError() {
    this.toastr.error( 'Sign Up Failed');
  }

  signIn() {
    this.dialog.closeAll();
    this.dialog.open(SignInComponent, {
      maxWidth: '100vw',
    });
  }


}


//  Object
// confirmPassword
// : 
// "247God"
// email
// : 
// "enocadesees@gmail.com"
// firstName
// : 
// "Marvel"
// lastName
// : 
// "Olamide"
// password
// : 
// "247God"
// phone
// : 
// "08243104445"