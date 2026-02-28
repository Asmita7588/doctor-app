import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-verify-dialog',
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './verify-dialog.html',
  styleUrl: './verify-dialog.scss',
})
export class VerifyDialog {
otpForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<VerifyDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { email: string }
  ) {
    this.otpForm = this.fb.group({ otp: ['', Validators.required] });
  }
  onCancel() { this.dialogRef.close(); }
  onVerify() { this.dialogRef.close(this.otpForm.value.otp); }
}






