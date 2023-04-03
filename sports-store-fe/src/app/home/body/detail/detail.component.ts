import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../../service/product/product.service';
import {Product} from '../../../entity/product/product';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductDto} from '../../../entity/product/product-dto';
import {TokenStorageService} from '../../../service/security/token-storage.service';
import {ToastrService} from 'ngx-toastr';
import {ShareService} from '../../../service/security/share.service';
import {Cart} from '../../../entity/order/cart';
import {Title} from '@angular/platform-browser';
import Swal from 'sweetalert2';
import {OrderService} from '../../../service/cart/order.service';
import {Orders} from '../../../entity/order/orders';
import {SizeService} from '../../../service/size/size.service';
import {Size} from '../../../entity/product/size';
import {Warehouse} from '../../../entity/warehouse/warehouse';
import {WarehouseService} from '../../../service/warehouse/warehouse.service';
import {forEachComment} from 'tslint';
import {collectExternalReferences} from '@angular/compiler';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  product: Product = {productId : 0, price : 0, productName : '', avatar: ''};
  cart: Cart = {productId: 0, price: 0, quantity: 0};
  cartList: Cart[] = [];
  quantity = 1;
  order: Orders ={orderId: 0, accountId: 0};
  role ='';
  sizeList: Size[] = [];
  warehouse: Warehouse = {id: 0, quantity: 0, productId: 0}

  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private tokenStorageService: TokenStorageService,
              private toast: ToastrService,
              private shareService: ShareService,
              private orderService: OrderService,
              private router: Router,
              private title: Title,
              private sizeService: SizeService,
              private warehouseService: WarehouseService) {
    this.title.setTitle('Chi tiết sản phẩm');
    this.sizeService.getAllSize().subscribe(next => {
      this.sizeList = next;
    })
    if(this.tokenStorageService.getToken()){
      this.role = this.tokenStorageService.getRole()[0];
    }
    this.activatedRoute.paramMap.subscribe(next => {
      const id = parseInt(<string> next.get('id'));
      this.productService.getProduct(id).subscribe(next => {
        this.product = next;
        this.warehouseService.findByProductId(next.productId).subscribe(next => {
          this.warehouse = next;
        })
      });
    });
    if(this.tokenStorageService.getToken()){
    this.orderService.findOrderByAccountId(parseInt(this.tokenStorageService.getIdAccount())).subscribe(next =>{
      this.order = next;
    })}
  }

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      this.orderService.findOrderByAccountId(parseInt(this.tokenStorageService.getIdAccount())).subscribe(next => {
        this.order = next;
        this.cartList = this.getAllCart(this.order.orderId);
      });
    }
    window.scrollTo(0, 10);
    if (this.tokenStorageService.getCart()) {
      this.cartList = this.tokenStorageService.getCart();
    }
  }

  getAllCart(orderId: number) {
    this.orderService.getAllCart(orderId).subscribe(next => {
      this.cartList = next;
    });
    return this.cartList;
  }


  checkQuantity(carts: Cart[], productId:number, qty: number){
    let sum = 0;
    for (let i = 0; i <carts.length ; i++) {
      if(carts[i].productId == productId){
        sum = carts[i].quantity + qty
      }
    }
    return sum;
  }

  addToCart(productId: number, quantity: string, size: string, item: Product){
    let qty = this.checkQuantity(this.cartList,item.productId,Number(quantity));
    if(qty > this.warehouse.quantity){
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Thông báo!',
        text: 'Mặt hàng này đã hết',
        showConfirmButton: false,
        timer: 2000
      });
    }else {
      if(!this.tokenStorageService.getToken()){
        this.addToCardLocal(item, quantity);
      }else {
        this.orderService.addToCart(this.order.orderId,productId,parseInt(quantity)).subscribe(next => {
          this.shareService.sendClickEvent();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Thông báo!',
            text: 'Đã thêm sản phẩm ' +' vào giỏ hàng.',
            showConfirmButton: false,
            timer: 2000
          });
        })}
    }
  }

  addToCardLocal(item: Product, quantity1: string) {
    let qty = this.checkQuantity(this.cartList,item.productId,Number(quantity1));
    if(qty > this.warehouse.quantity){
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Thông báo!',
        text: 'Mặt hàng này đã hết',
        showConfirmButton: false,
        timer: 2000
      });
    }else {
      if (this.tokenStorageService.getCart()) {
        this.cartList = this.tokenStorageService.getCart();
        this.cart.productId = item.productId;
        this.cart.productName = item.productName;
        this.cart.avatar = item.avatar;
        this.cart.price = item.price;
        if (this.tokenStorageService.checkExistId(item.productId)) {
          this.tokenStorageService.upQuantityProductPro(item.productId, this.cartList, parseInt(quantity1));
        } else {
          this.cart.quantity = parseInt(quantity1);
          this.cartList.push(this.cart);
        }
        this.tokenStorageService.setCart(this.cartList);
        this.shareService.sendClickEvent();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Thông báo!',
          text: 'Đã thêm sản phẩm '+ this.cart.productName +' vào giỏ hàng.',
          showConfirmButton: false,
          timer: 2000
        });
      } else {
        this.cart.productId = item.productId;
        this.cart.productName = item.productName;
        this.cart.avatar = item.avatar;
        this.cart.price = item.price;
        this.cart.quantity = parseInt(quantity1);
        this.cartList.push(this.cart);
        this.tokenStorageService.setCart(this.cartList);
        this.shareService.sendClickEvent();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Thông báo!',
          text: 'Đã thêm sản phẩm '+ this.cart.productName +' vào giỏ hàng.',
          showConfirmButton: false,
          timer: 2000
        });
      }
    }
  }

}
