export interface AuthForm {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  expires_in: number;
  _id: string;
  username: string;
}
