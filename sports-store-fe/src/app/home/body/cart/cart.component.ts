import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../../../service/security/token-storage.service';
import {Cart} from '../../../entity/order/cart';
import {ShareService} from '../../../service/security/share.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartList: Cart[] = [];
  totalPayment = 0;
  length = 0;
  quantity = 0;
  constructor(private tokenStorageService: TokenStorageService,
              private shareService: ShareService) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    if (!this.tokenStorageService.getCart()) {
      this.length = 0;
    } else {
      this.cartList = this.tokenStorageService.getCart();
      this.totalPayment = this.getTotalPayment();
      this.length = this.cartList.length;
      this.quantity = this.getQuantity();
    }
    this.shareService.getClickEvent().subscribe(next => {
      this.totalPayment = this.getTotalPayment();
      this.length = this.cartList.length;
      this.quantity = this.getQuantity();
    })
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

  removeCard(i: number) {
    this.cartList.splice(i,1);
    this.tokenStorageService.setCart(this.cartList);
    this.shareService.sendClickEvent();
  }

  updateQuantity(i: number, ev: any) {
    let newQuantity = parseInt(ev.target.value);
    newQuantity = newQuantity > 0 ? newQuantity : 1;
    // ev.target.value = new newQuantity;
    this.cartList[i].quantity = newQuantity;
    this.tokenStorageService.setCart(this.cartList);
    this.shareService.sendClickEvent();
  }

  reduceQuantity(i: number, quantity: number) {
    let newQuantity = quantity - 1;
    // newQuantity = newQuantity > 0 ? newQuantity : 1;
    if ( newQuantity == 0) {
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
    newQuantity = newQuantity > 0 ? newQuantity : 1;
    this.cartList[i].quantity = newQuantity;
    this.tokenStorageService.setCart(this.cartList);
    this.shareService.sendClickEvent();
  }

  increaseQuantity(i: number, quantity: number) {
    this.cartList[i].quantity = quantity + 1;
    this.tokenStorageService.setCart(this.cartList);
    this.shareService.sendClickEvent();
  }
}
