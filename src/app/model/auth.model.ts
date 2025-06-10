export interface RegisterRequest {
  username: string;
  password: string;
  email?: string; // Ajoute si ton backend le prend en charge
}

export interface AuthenticationRequest {
  username: string;
  password: string;
}

export interface AuthenticationResponse {
  token: string; // Le token JWT retourné par le backend
}