import { Injectable } from '@angular/core';
import { SessionService } from '../session.service';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private sessionService: SessionService, private router: Router) {}

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ) : | boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if(this.sessionService.token) {
            return true
        } else {
            this.router.navigate(['auth'])
            return false
        }
  }

  checkUserLogin(){

  }
}