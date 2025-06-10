import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { RegisterRequest, AuthenticationRequest, AuthenticationResponse } from '../model/auth.model';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/v1/auth'; // URL de ton backend

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

  // Supprimer le token (déconnexion)
  logout(): void {
    localStorage.removeItem('jwt_token');
  }

  // Vérifier si l'utilisateur est connecté
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}