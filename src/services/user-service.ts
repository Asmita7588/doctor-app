import { Injectable } from '@angular/core';
import { HttpService } from './http-service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private endpoint = '/user';
    
     constructor(private http: HttpService) {}
  
    register(data: any) {
      return this.http.postApi(`${this.endpoint}`, data)
    }

    verifyOtp(data: any) {
    return this.http.postApi(`${this.endpoint}/verify`, data);
  }

  resendOtp(data: any) {
    return this.http.postApi(`${this.endpoint}/resend-otp`, data);
  }
}
