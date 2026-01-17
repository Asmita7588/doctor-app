import { Component, computed, Input, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-sign-up',
  standalone : true,
  imports: [FormsModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss',
})
export class SignUp implements OnInit{

  userType = signal<'doctor' | 'patient'>('patient');
  ngOnInit(): void {
    // if (this.userType === 'patient') {
    //   this.doctor.update(val => ({...val, speciality: 'Patient'}));
    // }
  }

  doctor = signal({
    name: { firstName: '', lastName: '' },
    speciality: '',
    dob: '',
    gender: '',
    contact: { mobile: '', email: '' },
    address: { street1: '', city: '', zipCode: '' },
    password: '',
    confirmPassword: ''
  });

  age = computed(() => {
    const birthDate = this.doctor().dob;
    if (!birthDate) return 0;
    const timeDiff = Math.abs(Date.now() - new Date(birthDate).getTime());
    return Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
  });

  passwordsMatch = computed(() => {
    const p = this.doctor().password;
    const cp = this.doctor().confirmPassword;
    return p.length > 0 && cp.length > 0 && p === cp;
  });

  onSubmit() {
    
  }

}
