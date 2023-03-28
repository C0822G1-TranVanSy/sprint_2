import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../../../service/security/token-storage.service';
import {Cart} from '../../../entity/order/cart';
import {ShareService} from '../../../service/security/share.service';
import Swal from 'sweetalert2';
import {OrderService} from '../../../service/cart/order.service';
import {Orders} from '../../../entity/order/orders';

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

  constructor(private tokenStorageService: TokenStorageService,
              private shareService: ShareService,
              private orderService: OrderService) {
    if(this.tokenStorageService.getToken()){
      this.shareService.getClickEvent().subscribe(next => {
        this.cartList = this.getAllCart(this.order.orderId);
        this.getTotal(this.order.orderId);
        this.length = this.cartList.length;
      });
    }else {
      this.shareService.getClickEvent().subscribe(next => {
        this.cartList = this.tokenStorageService.getCart();
        this.totalPayment = this.getTotalPayment();
        this.length = this.cartList.length;
        this.totalQuantity = this.getQuantity();
      })
    }
  }

  getAllCart(orderId: number) {
    this.orderService.getAllCart(orderId).subscribe(next => {
      this.cartList = next;
      this.length = next.length;
    });
    return this.cartList;
  }

  getTotal(orderId: number) {
    this.orderService.getTotal(orderId).subscribe(next => {
      this.totalPayment = next.totalPayment;
      this.totalQuantity = next.totalQuantity;
    });
  }

  ngOnInit(): void {
    this.orderService.findOrderByAccountId(parseInt(this.tokenStorageService.getIdAccount())).subscribe(next => {
      this.order = next;
      this.cartList = this.getAllCart(this.order.orderId);
      this.getTotal(this.order.orderId);

    });

    window.scrollTo(0, 0);
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
      quantity += item.quantity
    })
    return quantity;
  }

   getTotalPayment() {
    let total = 0;
    this.cartList.forEach((item: any) => {
      total += item.quantity * item.price;
    })
    return total;
  }

  removeCartLocal(i: number) {
    this.cartList.splice(i,1);
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
    if ( quantity == 0) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.cartList.splice(i,1);
          this.tokenStorageService.setCart(this.cartList);
          this.shareService.sendClickEvent();
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
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
    if(!this.tokenStorageService.getToken()){
      this.increaseQuantityLocal(index, qty);
    }else {
      this.orderService.updateQuantity(this.order.orderId, productId, qty).subscribe(next => {
        this.shareService.sendClickEvent();
      });
    }
  }

  reduceQuantity(productId: number, qty: number, index: number) {
    if (qty == 0) {
      this.removeCart(productId, this.index);
      return;
    }
    if(!this.tokenStorageService.getToken()){
      this.reduceQuantityLocal(index,qty);
    }else {
    this.orderService.updateQuantity(this.order.orderId, productId, qty).subscribe(next => {
      this.shareService.sendClickEvent();
    });
    }
  }

  updateQuantity(productId: number, qty: number, index: number) {
    if(!this.tokenStorageService.getToken()){
      this.updateQuantityLocal(index,qty);
    }else {
    this.orderService.updateQuantity(this.order.orderId, productId, qty).subscribe(next => {
      this.shareService.sendClickEvent();
    });}
  }

  removeCart(productId: number, index: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        if(this.tokenStorageService.getToken()){
          this.orderService.removeCart(productId, this.order.orderId).subscribe(next => {
            this.shareService.sendClickEvent();
          });
        }else {
          this.removeCartLocal(index);
        }
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
      }
    });

  }

}
