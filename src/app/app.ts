import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LogIn } from './components/log-in/log-in';
import { Sign } from 'crypto';
import { SignUp } from './components/log-in/sign-up/sign-up';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LogIn, SignUp],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('medical-app');
}
