import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LogIn } from './components/log-in/log-in';
import { Sign } from 'crypto';
import { SignUp } from './components/sign-up/sign-up';
import { Home } from './components/home/home';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LogIn, SignUp, Home],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('medical-app');
}
