import { Injectable, inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Injectable({
  providedIn: 'root',
})

class PermissionService {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const auth = this.authService.isAuthorized();

    if (Object.keys(auth).length === 0 && auth.constructor === Object) {
      this.router.navigate(['/login']);
      return false;
    }else {
      const { token, user } = auth;

      if (token && user) {
        return true;
      }
      this.router.navigate(['/login']);
      return false;  
    }

  }
}

export const authGuard: CanActivateFn = (route, state) => {
  return inject(PermissionService).canActivate(route, state);
};
