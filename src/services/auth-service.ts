import { Injectable } from '@angular/core';
import { HttpService } from './http-service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
   
  private endpoint = '/auth/login';
  
   constructor(private http: HttpService) {}

  login(data: any) {
    return this.http.postApi(`${this.endpoint}`, data)
  }
}
