import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

  isSidebarOpen = signal(false);
  
  isLoggedIn = signal(false);
  searchQuery = signal('');

  constructor(private http: HttpClient) {}

  toggleSidebar() {
    this.isSidebarOpen.update(value => !value);
    console.log('Sidebar Toggled:', this.isSidebarOpen());
  }
  

  onSearch() {
    if (this.searchQuery().trim()) {
      console.log('Searching for:', this.searchQuery());
    }
  }

  handleAuth() {
    if (this.isLoggedIn()) {
      this.logout();
    } else {
      this.login();
    }
  }

  login() {
    this.isLoggedIn.set(true);
    console.log('User logged in');
  }

  logout() {
    this.isLoggedIn.set(false);
    console.log('User logged out');
  }

  toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
  

}
