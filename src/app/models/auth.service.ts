import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { AuthForm, AuthResponse } from "./auth.model";
import { ApiResult } from "./area.model";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient) { }

  signup(payload: AuthForm) {
    return this.http.post<ApiResult<AuthResponse>>("http://localhost:3000/api/auth/signup", payload);
  }

  login(payload: AuthForm) {
    return this.http.post<ApiResult<AuthResponse>>("http://localhost:3000/api/auth/login", payload);
  }
}
