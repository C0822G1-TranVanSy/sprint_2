import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../../../service/security/token-storage.service';
import {ShareService} from '../../../service/security/share.service';
import {OrderService} from '../../../service/cart/order.service';
import {ToastrService} from 'ngx-toastr';
import {Cart} from '../../../entity/order/cart';
import {Orders} from '../../../entity/order/orders';
import {render} from 'creditcardpayments/creditCardPayments';
import Swal from "sweetalert2";
import {SecurityService} from '../../../service/security/security.service';
import {Account} from '../../../entity/account/account';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  cartList: Cart[] = [];
  totalPayment = 0;
  length = 0;
  totalQuantity = 0;
  order: Orders = {orderId: 0, accountId: 0};
  index = 0;
  account: Account = {accountId: 0, username: '',
    email: '', phoneNumber: '', address: '', name: '', avatar: ''};
  address = ''; phone = ''; note = '';
  form: FormGroup;

  constructor(private tokenStorageService: TokenStorageService,
              private shareService: ShareService,
              private orderService: OrderService,
              private toast: ToastrService,
              private securityService: SecurityService,
              private router: Router) {
    this.form = new FormGroup({
      address: new FormControl('',[Validators.minLength(5)]),
      phoneNumber: new FormControl('', [Validators.pattern('[\\d]{10}')]),
      note: new FormControl()
    })
    if (this.tokenStorageService.getToken()) {
      this.shareService.getClickEvent().subscribe(next => {
        this.orderService.findOrderByAccountId(parseInt(this.tokenStorageService.getIdAccount())).subscribe(next => {
          this.order = next;
          this.cartList = this.getAllCart(this.order.orderId);

          this.totalPayment = this.getTotalPaymentBE(this.order.orderId);
          this.totalQuantity = this.getTotalQuantityBE(this.order.orderId);
          this.length = this.cartList.length;
        });

      });
    }
  }

  ngOnInit(): void {
    window.scrollTo(0, 70);
    if (this.tokenStorageService.getToken()) {
      this.orderService.findOrderByAccountId(parseInt(this.tokenStorageService.getIdAccount())).subscribe(next => {
        this.order = next;
        this.cartList = this.getAllCart(this.order.orderId);
        this.totalQuantity = this.getTotalQuantityBE(this.order.orderId);
        this.totalPayment = this.getTotalPaymentBE(this.order.orderId);

      });
      this.getInfoByAccountId();
    }
  }

  getInfoByAccountId(){
    const id = parseInt(this.tokenStorageService.getIdAccount());
    this.securityService.getInfoByAccountId(id).subscribe(next => {
      this.account = next;
    })
  }

  getTotalQuantityBE(orderId: number) {
    this.orderService.getTotal(orderId).subscribe(next => {
      if(next){
        this.totalQuantity = next.totalQuantity;
      }
    });
    return this.totalQuantity;
  }

  getTotalPaymentBE(orderId: number) {
    this.orderService.getTotal(orderId).subscribe(next => {
      if(next){
        this.totalPayment = next.totalPayment;
        this.payAll(this.totalPayment);
      }
    });
    return this.totalPayment;
  }

  getAllCart(orderId: number) {
    this.orderService.getAllCart(orderId).subscribe(next => {
      this.cartList = next;
      this.length = next.length;
    });
    return this.cartList;

  }

  payAll(totalPayment: number) {
    if(!this.tokenStorageService.getToken()){
      this.toast.error('Bạn cần đăng nhập để tiếp tục thanh toán', 'Thông báo',{positionClass: 'toast-top-right'})
    }else {
        render(
          {
            id: '#myPayPalButtons',
            currency: 'USD',
            value: totalPayment.toString(),
            onApprove: (details) => {
              if(this.form.valid){
              const formValue = this.form.value;
              this.address = formValue.address;
              this.phone = formValue.phoneNumber;
              if (this.address == '') {
                this.address = this.account.address;
              }
              if (this.phone == '') {
                this.phone = this.account.phoneNumber;
              }
              this.note = formValue.note;
              this.orderService.payAll(this.order.orderId, this.address, this.phone, this.note).subscribe(next => {
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Thông báo!',
                  text: 'Thanh toán thành công',
                  showConfirmButton: false,
                  timer: 2000
                });
                if (this.tokenStorageService.getRole()[0] != "ROLE_ADMIN") {
                  this.orderService.createCart(parseInt(this.tokenStorageService.getIdAccount())).subscribe(next => {
                    }
                  );
                }
                this.router.navigateByUrl("/body/cart");
                this.shareService.sendClickEvent();
              })
              }
            }
          }
        );
      }
    }

}
