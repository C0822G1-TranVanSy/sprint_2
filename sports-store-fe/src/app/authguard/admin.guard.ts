import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {TokenStorageService} from '../service/security/token-storage.service';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private tokenStorageService: TokenStorageService,
              private toast: ToastrService,
              private router: Router) {
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
      const roles = this.tokenStorageService.getRole();
      if (roles.indexOf('ROLE_ADMIN') > - 1) {
        return true;
      }else {
        this.toast.error('Bạn không đủ quyền.Vui lòng đăng nhập để tiếp tục.', 'Thất bại', {positionClass: 'toast-top-center'});
        this.router.navigateByUrl('/error');
        return false;
      }
    } else {
      this.toast.error('Bạn chưa đăng nhập,Vui lòng đăng nhập để tiếp tục.', 'Thất bại', {positionClass: 'toast-top-center'});
      this.router.navigateByUrl('/error');
      return false;
    }
  }

}
