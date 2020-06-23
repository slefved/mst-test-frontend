import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthRepository } from "../models/auth.repository";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html"
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  username: string;

  private authStatusSubscriber: Subscription;

  constructor(private authRepository: AuthRepository, private router: Router) { }

  ngOnInit() {
    this.isAuthenticated = this.authRepository.getIsAuthenticated();
    this.username = this.authRepository.getUsername();

    this.authStatusSubscriber = this.authRepository
      .getAuthStatusListener()
      .subscribe(authStatus => {
        this.isAuthenticated = authStatus.is_authenticated;
        this.username = authStatus.username;
      })
  }

  onLogout() {
    this.authRepository.logout();
  }

  ngOnDestroy() {
    this.authStatusSubscriber.unsubscribe();
  }
}
