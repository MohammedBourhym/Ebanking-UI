import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterRequest, AuthenticationRequest, AuthenticationResponse } from '../model/auth.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.backendHost + '/api/v1/auth';
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {}

  register(request: RegisterRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, request);
  }

  authenticate(request: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.apiUrl}/authenticate`, request);
  }

  // Stocker le token dans localStorage
  saveToken(token: string): void {
    localStorage.setItem('jwt_token', token);
  }

  // Récupérer le token
  getToken(): string | null {
    return localStorage.getItem('jwt_token');
  }

  logout(): void {
    localStorage.removeItem('jwt_token');
  }

  // Method to clear invalid tokens and reset auth state
  clearInvalidToken(): void {
    const token = this.getToken();
    if (token) {
      try {
        const parts = token.split('.');
        if (parts.length !== 3) {
          this.logout();
        }
      } catch (error) {
        this.logout();
      }
    }
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        this.logout();
        return false;
      }

      return !this.jwtHelper.isTokenExpired(token);
    } catch (error) {
      this.logout();
      return false;
    }
  }

  getUserRoles(): string[] {
    const token = this.getToken();
    if (!token) {
      return [];
    }

    try {
      const decodedToken = this.jwtHelper.decodeToken(token);
   

      if (decodedToken?.authorities) {
        const authorities = Array.isArray(decodedToken.authorities)
          ? decodedToken.authorities
          : [decodedToken.authorities];
  
        return authorities;
      }

      if (decodedToken?.roles) {
        const roles = Array.isArray(decodedToken.roles)
          ? decodedToken.roles
          : [decodedToken.roles];
    
        return roles;
      }

      if (decodedToken?.scope) {
        const scopes = decodedToken.scope.split(' ');
     
        return scopes;
      }

      console.log('No roles found, returning default ROLE_USER');
      return ['ROLE_USER'];

    } catch (error) {
      console.error('Error in getUserRoles:', error);
      this.logout();
    }
    return [];
  }

  hasRole(role: string): boolean {
    const userRoles = this.getUserRoles();
    return userRoles.includes(role);
  }
}