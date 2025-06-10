import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { 
    path: 'login', 
    loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent) 
  },
  { 
    path: 'register', 
    loadComponent: () => import('./auth/register/register.component').then(m => m.RegisterComponent) 
  },
  { 
    path: '', 
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent) },
      { path: 'customers', loadComponent: () => import('./customers/customers.component').then(m => m.CustomersComponent) },
      { path: 'accounts', loadComponent: () => import('./accounts/accounts.component').then(m => m.AccountsComponent) }
    ]
  },
  { path: '**', redirectTo: '/login' }
];
