import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Auth, onAuthStateChanged, getAuth } from '@angular/fire/auth';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private auth: Auth) {
    this.auth = getAuth();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // return new Promise((resolve, reject) => {
    //   if (this.authService.isLoggedIn) {
    //     resolve(true);
    //   } else {
    //     console.log('Auth Guard: user not logged in');
    //     this.router.navigate(['/login']);
    //     resolve(false);
    //   }
    // });
    return new Promise((resolve, reject) => {
      onAuthStateChanged(this.auth, (user) => {
        if (user) {
          // logged in
          resolve(true);
        } else {
          console.log('Auth Guard: user not logged in');
          this.router.navigate(['/login']);
          resolve(false);
        }
      });
    });
  }
}
