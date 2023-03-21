import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {TokenStorageService} from '../service/security/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private tokenStorageService: TokenStorageService,
              private router: Router,
              private toast: ToastrService
              ) {
  }

  /**
   * Create by: SyTV
   * Date create: 02/03/2023
   * @param route
   * @param state
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.tokenStorageService.getToken()) {
      return true;
    } else {
      this.toast.error('Vui lòng đăng nhập để tiếp tục.', 'Thất bại', {positionClass: 'toast-top-center'});
      this.router.navigateByUrl('/security/login');
      return false;
    }
  }

}
