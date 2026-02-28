import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth-service';
import { VerifyDialog } from '../verify-dialog/verify-dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../../services/user-service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-log-in',
  standalone : true,
   imports: [ ReactiveFormsModule,MatCardModule,RouterLink,MatIconModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './log-in.html',
  styleUrl: './log-in.scss',
})
export class LogIn implements OnInit{

    loginForm!: FormGroup;

   constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar:MatSnackBar,
    private userService : UserService,
    private dialog : MatDialog
  ) {}
  
   ngOnInit(): void {
  this.loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });
}


//   onLogin() {
//   if (this.loginForm.invalid) return;

//   this.authService.login(this.loginForm.value)
//     .subscribe({
//       next: (res: any) => {
//         const token = res?.token;

//         if (token) {
//           localStorage.setItem('authToken', token);
//         }

//         this.router.navigate(['/home']);
//       },
//       error: (err: any) => {
//          console.log('Login error:', err);
//       }
//     });
// }


onLogin() {
  if (this.loginForm.invalid) return;

  this.authService.login(this.loginForm.value).subscribe({
    next: (res: any) => {
      localStorage.setItem('authToken', res.token);
      this.router.navigate(['/home']);
    },
    error: (err: any) => {
      console.log("in eror block of login")
      if (err.status === 403) { 
        const snack = this.snackBar.open(err.error.message, 'VERIFY NOW', { duration: 10000 });
        snack.onAction().subscribe(() => {
          this.userService.resendOtp({ email: this.loginForm.value.email }).subscribe(() => {
            this.openVerifyPopup(this.loginForm.value.email);
          });
        });
      } else {
        this.snackBar.open(err.error?.message || 'Login Failed', 'Close');
      }
    }
  });
}

openVerifyPopup(email: string) {
  const dialogRef = this.dialog.open(VerifyDialog, { data: { email }, width: '400px' });
  dialogRef.afterClosed().subscribe((otp: any) => {
    if (otp) {
      this.userService.verifyOtp({ email, otp }).subscribe({
        next: (res: any) => {
          this.snackBar.open(res.message, 'Success');
          this.router.navigate(['/home']);
        },
        error: (err: { error: { message: any; }; }) => this.snackBar.open(err.error?.message, 'Failed')
      });
    }
  });
}

}
