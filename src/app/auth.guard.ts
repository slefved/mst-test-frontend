import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { AuthRepository } from "./models/auth.repository";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authRepository: AuthRepository,
    private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
      const isAuthenticated = this.authRepository.getIsAuthenticated();
      if (!isAuthenticated) {
        this.router.navigate(['login']);
      }
      return isAuthenticated;
    }
}
