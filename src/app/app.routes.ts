import { Routes } from '@angular/router';
import { SignUp } from './components/sign-up/sign-up'; 
import { LogIn } from './components/log-in/log-in';
import { Home } from './components/home/home';
import { AuthGuard } from './auth-guard';
export const routes: Routes = [
  { path: '', component: LogIn },
  { path: 'register', component: SignUp },
  { path: 'home', component: Home ,
    canActivate: [AuthGuard],
    children: []
  },
  
];




