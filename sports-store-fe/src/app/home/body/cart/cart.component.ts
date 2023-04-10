import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../../../service/security/token-storage.service';
import {Cart} from '../../../entity/order/cart';
import {ShareService} from '../../../service/security/share.service';
import Swal from 'sweetalert2';
import {OrderService} from '../../../service/cart/order.service';
import {Orders} from '../../../entity/order/orders';
import {render} from 'creditcardpayments/creditCardPayments';
import {ToastrService} from 'ngx-toastr';
import {SecurityService} from '../../../service/security/security.service';
import {Account} from '../../../entity/account/account';
import {Router} from '@angular/router';
import {WarehouseService} from '../../../service/warehouse/warehouse.service';
import {Warehouse} from '../../../entity/warehouse/warehouse';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartList: Cart[] = [];
  totalPayment = 0;
  length = 0;
  totalQuantity = 0;
  order: Orders = {orderId: 0, accountId: 0};
  index = 0;
  warehouse: Warehouse = {id: 0, quantity: 0, productId: 0}
  qtyWare = 0;

  constructor(private tokenStorageService: TokenStorageService,
              private shareService: ShareService,
              private orderService: OrderService,
              private toast: ToastrService,
              private router: Router,
              private warehouseService: WarehouseService,
              private title: Title) {
    this.title.setTitle('Giỏ hàng')
      this.shareService.getClickEvent().subscribe(next => {
        if (this.tokenStorageService.getToken()){
          this.orderService.findOrderByAccountId(parseInt(this.tokenStorageService.getIdAccount())).subscribe(next => {
            this.order = next;
            this.cartList = this.getAllCart(this.order.orderId);
            this.totalPayment = this.getTotalPaymentBE(this.order.orderId);
            this.totalQuantity = this.getTotalQuantityBE(this.order.orderId);
            this.length = this.cartList.length;
          });
        }else {
          this.cartList = this.tokenStorageService.getCart();
          this.totalPayment = this.getTotalPayment();
          this.length = this.cartList.length;
          this.totalQuantity = this.getQuantity();
        }
      });
  }


  getAllCart(orderId: number) {
    this.orderService.getAllCart(orderId).subscribe(next => {
      this.cartList = next;
      this.length = next.length;
    });
    return this.cartList;
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

  getTotalPaymentBE(orderId: number) {
    this.orderService.getTotal(orderId).subscribe(next => {
      if(next){
        this.totalPayment = next.totalPayment;
      }
    });
    return this.totalPayment;
  }

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      this.orderService.findOrderByAccountId(parseInt(this.tokenStorageService.getIdAccount())).subscribe(next => {
        this.order = next;
        this.cartList = this.getAllCart(this.order.orderId);
        // this.getTotal(this.order.orderId);
        this.totalQuantity = this.getTotalQuantityBE(this.order.orderId);
        this.totalPayment = this.getTotalPaymentBE(this.order.orderId);
      });
    }
    window.scrollTo(0, 70);
    if (!this.tokenStorageService.getCart()) {
      this.length = 0;
    } else {
      this.cartList = this.tokenStorageService.getCart();
      this.totalPayment = this.getTotalPayment();
      this.length = this.cartList.length;
      this.totalQuantity = this.getQuantity();
    }
  }

  getQuantity() {
    let quantity = 0;
    this.cartList.forEach((item: any) => {
      quantity += item.quantity;
    });
    return quantity;
  }

  getTotalPayment() {
    let total = 0;
      this.cartList.forEach((item: any) => {
        total += item.quantity * item.price;
      });
    return total;
  }

  removeCartLocal(i: number) {
    this.cartList.splice(i, 1);
    this.tokenStorageService.setCart(this.cartList);
    this.shareService.sendClickEvent();
  }

  updateQuantityLocal(i: number, qty: number) {
    let newQuantity = qty;
    newQuantity = newQuantity > 0 ? newQuantity : 1;
    // ev.target.value = new newQuantity;
    this.cartList[i].quantity = newQuantity;
    this.tokenStorageService.setCart(this.cartList);
    this.shareService.sendClickEvent();
  }

  reduceQuantityLocal(i: number, quantity: number) {
    if (quantity == 0) {
      Swal.fire({
        title: 'Bạn có chắc chắn muốn xóa?',
        text: 'Bạn sẽ không thể khôi phục!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Hủy!',
        confirmButtonText: 'Xóa!',
      }).then((result) => {
        if (result.isConfirmed) {
          this.cartList.splice(i, 1);
          this.tokenStorageService.setCart(this.cartList);
          this.shareService.sendClickEvent();
          Swal.fire(
            'Đã xóa!',
            'Sản phẩm của bạn đã được xóa khỏi giỏ.',
            'success'
          );
        }
      });
    }
    quantity = quantity > 0 ? quantity : 1;
    this.cartList[i].quantity = quantity;
    this.tokenStorageService.setCart(this.cartList);
    this.shareService.sendClickEvent();
  }

  increaseQuantityLocal(i: number, quantity: number) {
    this.cartList[i].quantity = quantity;
    this.tokenStorageService.setCart(this.cartList);
    this.shareService.sendClickEvent();
  }

  increaseQuantity(productId: number, qty: number, index: number) {
    let qty2 = 0;
    this.warehouseService.findByProductId(productId).subscribe(next => {
     qty2= next.quantity;
      if(qty > qty2){
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Thông báo!',
          text: 'Mặt hàng này đã hết',
          showConfirmButton: false,
          timer: 2000
        });
      }else {
        if (!this.tokenStorageService.getToken()) {
          this.increaseQuantityLocal(index, qty);
        } else {
          this.orderService.updateQuantity(this.order.orderId, productId, qty).subscribe(next => {
            this.shareService.sendClickEvent();
          });
        }
      }
    })
    console.log(qty2);

  }

  reduceQuantity(productId: number, qty: number, index: number) {
    if (qty == 0) {
      this.removeCart(productId, this.index);
      return;
    }
    if (!this.tokenStorageService.getToken()) {
      this.reduceQuantityLocal(index, qty);
    } else {
      this.orderService.updateQuantity(this.order.orderId, productId, qty).subscribe(next => {
        this.shareService.sendClickEvent();
      });
    }
  }

  updateQuantity(productId: number, qty: number, index: number) {
    if(qty > this.getWareHouse(productId)){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Thông báo!',
        text: 'Mặt hàng này đã hết',
        showConfirmButton: false,
        timer: 2000
      });
    }else {
      if (!this.tokenStorageService.getToken()) {
        this.updateQuantityLocal(index, qty);
      } else {
        this.orderService.updateQuantity(this.order.orderId, productId, qty).subscribe(next => {
          this.shareService.sendClickEvent();
        });
      }
    }
  }

  getWareHouse(productId: number){
    this.warehouseService.findByProductId(productId).subscribe(next => {
      this.warehouse = next;
      this.qtyWare = next.quantity;
      console.log(next.quantity + ' cái này là next');
      return next.quantity;
    })
    return this.qtyWare;
  }

  removeCart(productId: number, index: number) {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa?',
      text: 'Bạn sẽ không thể khôi phục!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Hủy!',
      confirmButtonText: 'Xóa!',
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.tokenStorageService.getToken()) {
          this.orderService.removeCart(productId, this.order.orderId).subscribe(next => {
            this.shareService.sendClickEvent();
          });
        } else {
          this.removeCartLocal(index);
        }
        Swal.fire(
          'Đã xóa!',
          'Sản phẩm của bạn đã được xóa khỏi giỏ.',
          'success'
        );
      }
    });

  }


  moveToPayment() {
    if(this.cartList.length == 0 || this.totalQuantity == 0){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Thông báo!',
        text: 'Chưa có mặt hàng để thanh toán.',
        showConfirmButton: false,
        timer: 2000
      });
    }else {
      if(this.tokenStorageService.getToken()){
        this.router.navigateByUrl("/body/payment");
      }else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Thông báo!',
          text: 'Đăng nhập để tiếp tục',
          showConfirmButton: false,
          timer: 2000
        });
      }
    }

  }
}
