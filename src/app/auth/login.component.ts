import { Component } from "@angular/core";
import { AuthRepository } from "../models/auth.repository";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { NgForm } from "@angular/forms";
import { AuthForm } from "../models/auth.model";

@Component({
  templateUrl: "./login.component.html",
  styleUrls: ["./floating-labels.css"]
})
export class LoginComponent {
  isLoading = false;
  isLoginFailed = false;
  private authStatusSub: Subscription;

  constructor(private authRepository: AuthRepository, private router: Router) { }

  ngOnInit() {
    this.authStatusSub = this.authRepository.getAuthStatusListener()
      .subscribe(res => {
        this.isLoading = false;
        this.isLoginFailed = !res.is_authenticated;
        if (res.is_authenticated) {
          this.router.navigateByUrl('/');
        }
      })
  }

  onLogin(form: NgForm) {
    if (form.invalid) return;

    const loginForm: AuthForm = {
      username: form.value.username,
      password: form.value.password,
    }

    this.isLoading = true;
    this.authRepository.login(loginForm);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
