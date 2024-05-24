import { Injectable, inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Injectable({
  providedIn: 'root',
})

class LoginPermissionService {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const { token, user } = this.authService.isAuthorized() as { token: any; user: any };

    if (token && user) {
      this.router.navigate(['/dashboard']);
      return false;
    }
    return true;
  }
}

export const loginGuard: CanActivateFn = (route, state) => {
  return inject(LoginPermissionService).canActivate(route, state);
};