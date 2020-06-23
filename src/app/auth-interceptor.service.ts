import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler } from "@angular/common/http";
import { AuthRepository } from "./models/auth.repository";

@Injectable()
export class AuthInterceptor {
  constructor(private authRepository: AuthRepository) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.authRepository.getToken();
    const request = req.clone({
      headers: req.headers.set("Authorization", "Bearer " + token)
    });
    return next.handle(request);
  }
}
