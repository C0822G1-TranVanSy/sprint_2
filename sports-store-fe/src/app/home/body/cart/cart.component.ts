import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../../../service/security/token-storage.service';
import {Cart} from '../../../entity/order/cart';
import {ShareService} from '../../../service/security/share.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartList: Cart[] = [];
  totalPayment = 0;
  length = 0;
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
    }
    this.shareService.getClickEvent().subscribe(next => {
      this.totalPayment = this.getTotalPayment();
    })
  }


   getTotalPayment() {
    let total = 0;
    for (let i = 0; i < this.cartList.length; i++) {
      total += (this.cartList[i].quantity * this.cartList[i].price)
    }
    return total;
  }

  removeCard(id: number) {
    for (let i = 0; i < this.cartList.length ; i++) {
      if(this.cartList[i].id == id){
        this.cartList.splice(i,1);
      }
    }
    this.tokenStorageService.setCart(this.cartList);
    this.shareService.sendClickEvent();
  }
}
