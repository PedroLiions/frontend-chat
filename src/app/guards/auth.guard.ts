import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private jwtHelper: JwtHelperService,
    private router: Router
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return this.tokenIsExpired();
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.tokenIsExpired();
  }

  tokenIsExpired() {
    const token = localStorage.getItem("access_token");
    if (!token) {
      this.router.navigateByUrl("/login");
      return false;
    }

    const tokenIsExpired = this.jwtHelper.isTokenExpired(token);

    if (tokenIsExpired) {
      this.router.navigateByUrl("/login");
    }

    return !tokenIsExpired
  }

}
