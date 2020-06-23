import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { AuthForm } from "./auth.model";

@Injectable({
  providedIn: "root"
})
export class AuthRepository {
  private token: string;
  private userid: string;
  private username: string;
  private isAuthenticated = false;
  private tokenTimer: any;
  private authStatusListener = new Subject<{ is_authenticated: boolean, username: string }>();

  constructor(
    private authService: AuthService,
    private router: Router) { }

  getUserid() { return this.userid; }
  getUsername() { return this.username; }
  getToken() { return this.token; }
  getIsAuthenticated() { return this.isAuthenticated; }
  getAuthStatusListener() { return this.authStatusListener.asObservable(); }

  signup(signupRequest: AuthForm) {
    this.authService.signup(signupRequest).subscribe(res => {
      console.log(res);

      if (res.status === "success") {
        this.token = res.data.token;
        this.isAuthenticated = true;
        this.userid = res.data._id;
        this.username = res.data.username;

        this.setAuthTimer(res.data.expires_in);
        this.authStatusListener.next({ is_authenticated: true, username: res.data.username });

        const now = new Date();
        const expirationDate = new Date(now.getTime() + res.data.expires_in * 1000);
        this.saveAuthData(res.data.token, res.data.username, expirationDate);
      }
    }, err => {
      this.authStatusListener.next({ is_authenticated: false, username: null });
    });
  }

  login(loginRequest: AuthForm) {
    this.authService.login(loginRequest).subscribe(res => {
      if (res.status === "success") {
        this.token = res.data.token;
        this.isAuthenticated = true;
        this.userid = res.data._id;
        this.username = res.data.username;

        this.setAuthTimer(res.data.expires_in);
        this.authStatusListener.next({ is_authenticated: true, username: res.data.username });

        const now = new Date();
        const expirationDate = new Date(now.getTime() + res.data.expires_in * 1000);
        this.saveAuthData(res.data.token, res.data.username, expirationDate);
      }
    }, err => {
      this.authStatusListener.next({ is_authenticated: false, username: null });
    });
  }

  autoAuth() {
    const authData = this.getAuthData();
    if (!authData) return;

    const now = new Date();
    const isInFuture = authData.expirationDate.getTime() - now.getTime();
    if (isInFuture > 0) {

      this.token = authData.token;
      this.username = authData.username;
      this.isAuthenticated = true;
      this.setAuthTimer(isInFuture / 1000)
      this.authStatusListener.next({ is_authenticated: true, username: authData.username });
    } else {
      this.logout()
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next({ is_authenticated: false, username: null });
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    // do something after lose auth!
    this.router.navigateByUrl('login');
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, username: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("expiration");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const expirationDate = localStorage.getItem("expiration");
    if (!token || !expirationDate || !username) {
      return;
    }

    return {
      token: token,
      username: username,
      expirationDate: new Date(expirationDate)
    }
  }
}
