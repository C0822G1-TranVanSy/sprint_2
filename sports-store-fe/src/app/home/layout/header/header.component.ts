import {Component, HostListener, OnInit} from '@angular/core';
import {TokenStorageService} from '../../../service/security/token-storage.service';
import {SecurityService} from '../../../service/security/security.service';
import {Router} from '@angular/router';
import {ViewportScroller} from '@angular/common';
import {ShareService} from '../../../service/security/share.service';
import Swal from "sweetalert2";
import {CategoryService} from '../../../service/product/category.service';
import {Category} from '../../../entity/product/category';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  pageYoffSet = 0;
  isLoggedIn = false;
  user: any;
  username = '';
  role = '';
  category: Category[] =[];

  constructor(private scroll: ViewportScroller,
              private tokenStorageService: TokenStorageService,
              private securityService: SecurityService,
              private router: Router,
              private shareService: ShareService,
              private categoryService: CategoryService) {
     this.categoryService.getAllCategory().subscribe(next => {
       this.category = next;
    })
    this.securityService.getIsLoggedIn().subscribe(next => {
      this.isLoggedIn = next;
    });
    this.securityService.getUserLoggedIn().subscribe(next => {
      this.user = next;
    });
  }

  ngOnInit(): void {
    this.role = this.getRole();
      this.shareService.getClickEvent().subscribe(next => {
        this.role = this.getRole();
      })
  }

  getRole(){
    let role = '';
    if(this.tokenStorageService.getRole()){
      role = this.tokenStorageService.getRole()[0];
    }
    return role;
  }

  // tslint:disable-next-line:typedef
  @HostListener('window:scroll', ['$event']) onScroll() {
    this.pageYoffSet = window.pageYOffset;
  }

  // tslint:disable-next-line:typedef
  scrollToTop() {
    this.scroll.scrollToPosition([0, 0]);
  }

  scrollToTopLogin() {
    this.scroll.scrollToPosition([0, 660]);
  }

  /**
   * Create by: SyTV
   * Date create: 02/03/2023
   * funtion: logout
   *
   */
  logout() {
    this.tokenStorageService.logout();
    this.securityService.setIsLoggedIn(null, false);
    this.router.navigateByUrl('security/login');
    this.shareService.sendClickEvent();
    Swal.fire({
      position: 'center',
      icon: 'info',
      title: 'Thông báo!',
      text: 'Đăng xuất thành công',
      showConfirmButton: false,
      timer: 2000
    });
  }

}
