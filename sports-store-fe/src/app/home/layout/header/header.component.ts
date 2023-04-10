import {Component, HostListener, OnInit} from '@angular/core';
import {TokenStorageService} from '../../../service/security/token-storage.service';
import {SecurityService} from '../../../service/security/security.service';
import {Router} from '@angular/router';
import {ViewportScroller} from '@angular/common';
import {ShareService} from '../../../service/security/share.service';
import Swal from "sweetalert2";
import {CategoryService} from '../../../service/product/category.service';
import {Category} from '../../../entity/product/category';
import {OrderService} from '../../../service/cart/order.service';
import {Orders} from '../../../entity/order/orders';
import {Cart} from '../../../entity/order/cart';
import {Account} from '../../../entity/account/account';

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
  totalQuantity = 0;
  order: Orders = {orderId: 0, accountId: 0};
  cartList: Cart[] = [];
  account: Account = {
    accountId: 0, username: '',
    email: '', phoneNumber: '', address: '', name: '', avatar: ''
  };

  constructor(private scroll: ViewportScroller,
              private tokenStorageService: TokenStorageService,
              private securityService: SecurityService,
              private router: Router,
              private shareService: ShareService,
              private categoryService: CategoryService,
              private orderService: OrderService) {
    this.categoryService.getAllCategory().subscribe(next => {
       this.category = next;
    })
    this.securityService.getIsLoggedIn().subscribe(next => {
      this.isLoggedIn = next;
    });
    this.securityService.getUserLoggedIn().subscribe(next => {
      this.user = next;
    });

    this.shareService.getClickEvent().subscribe(next => {
      if(this.tokenStorageService.getToken()){
        this.orderService.findOrderByAccountId(parseInt(this.tokenStorageService.getIdAccount())).subscribe(next => {
          this.order = next;
          this.totalQuantity = this.getTotalQuantityBE(this.order.orderId);
        });
        this.getInfoByAccountId();
      }
    });
    this.shareService.getClickEvent().subscribe(next => {
      this.cartList = this.tokenStorageService.getCart();
      this.totalQuantity = this.getQuantity();
    })
  }

  getInfoByAccountId() {
    const id = parseInt(this.tokenStorageService.getIdAccount());
    this.securityService.getInfoByAccountId(id).subscribe(next => {
      this.account = next;
    });
  }

  ngOnInit(): void {
    this.role = this.getRole();
    this.cartList = this.tokenStorageService.getCart();
      this.shareService.getClickEvent().subscribe(next => {
        this.role = this.getRole();
      })
    if(this.tokenStorageService.getToken()){
      this.getInfoByAccountId();
      this.orderService.findOrderByAccountId(parseInt(this.tokenStorageService.getIdAccount())).subscribe(next => {
        this.order = next;
        this.totalQuantity =this.getTotalQuantityBE(this.order.orderId);
      });
    }else {
      this.totalQuantity = this.getQuantity();
    }

  }

  getQuantity() {
    let quantity = 0;
    if (this.cartList != null) {
      this.cartList.forEach((item: any) => {
        quantity += item.quantity
      })
    }
    return quantity;
  }

  getTotalQuantityBE(orderId: number) {
    this.orderService.getTotal(orderId).subscribe(next => {
      if(next){
        // this.totalPayment = next.totalPayment;
        this.totalQuantity = next.totalQuantity;
      }
    });
    return this.totalQuantity;
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
    this.getQuantity();
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
