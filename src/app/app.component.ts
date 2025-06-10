import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  template: `
    <app-header *ngIf="authService.isLoggedIn()"></app-header>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  constructor(public authService: AuthService) {}
}
