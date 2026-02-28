import { Component, computed, inject, Input, OnInit, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { UserService } from '../../../services/user-service';
import { Router } from '@angular/router';
import { VerifyDialog } from '../verify-dialog/verify-dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss',
})
export class SignUp implements OnInit {
  regForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog : MatDialog
    
  ) {}

  ngOnInit(): void {
    this.regForm = this.fb.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        role: ['DOCTOR', [Validators.required]],
        gender: ['', [Validators.required]],
          mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
          email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: this.passwordMatchValidator,
      },
    );
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    return password && confirmPassword && password.value !== confirmPassword.value
      ? { passwordMismatch: true }
      : null;
  }

  // onRegister() {
  //   if (this.regForm.invalid) return;
  //   console.log('Form Data:', this.regForm.getRawValue());
  //   const payload = {
  //     firstName : this.regForm.value.firstName,
  //     lastName : this.regForm.value.lastName,
  //     role : this.regForm.value.role,
  //     email:  this.regForm.value.email,
  //     gender : this.regForm.value.gender,
  //     mobileNumber : this.regForm.value.mobileNumber,
  //     password : this.regForm.value.password
  //   }
  //   this.userService.register(payload).subscribe({
  //     next: (res: any) => {
  //       console.log('Success:', res.message);
  //       console.log('User Data:', res.user);

  //       setTimeout(() => {
  //         this.router.navigate(['/home']);
  //       }, 2000);
  //     },
  //     error: (err: any) => {
  //       console.log('Login error:', err);
  //     },
  //   });
  // }

  onRegister() {
  if (this.regForm.invalid) return;
  const payload = {
      firstName : this.regForm.value.firstName,
      lastName : this.regForm.value.lastName,
      role : this.regForm.value.role,
      email:  this.regForm.value.email,
      gender : this.regForm.value.gender,
      mobileNumber : this.regForm.value.mobileNumber,
      password : this.regForm.value.password
    }

  this.userService.register(payload).subscribe({
    next: (res: any) => {
      this.snackBar.open(res.message || 'Registered! Please verify email.', 'Close', { duration: 5000 });
      this.openVerifyPopup(payload.email);
    },
    error: (err) => this.snackBar.open(err.error?.message || 'Registration error', 'Error')
  });
}



openVerifyPopup(email: string) {
  const dialogRef = this.dialog.open(VerifyDialog, { data: { email }, width: '400px' });
  dialogRef.afterClosed().subscribe((otp: any) => {
    if (otp) {
      this.userService.verifyOtp({ email, otp }).subscribe({
        next: (res : any) => {
          this.snackBar.open(res.message, 'Success');
          this.router.navigate(['/home']);
        },
        error: (err) => this.snackBar.open(err.error?.message, 'Failed')
      });
    }
  });
}
}
