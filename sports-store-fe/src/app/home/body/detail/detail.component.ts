import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../../service/product/product.service';
import {Product} from '../../../entity/product/product';
import {ActivatedRoute} from '@angular/router';
import {ProductDto} from '../../../entity/product/product-dto';
import {TokenStorageService} from '../../../service/security/token-storage.service';
import {ToastrService} from 'ngx-toastr';
import {ShareService} from '../../../service/security/share.service';
import {Cart} from '../../../entity/order/cart';
import {Title} from '@angular/platform-browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  product: Product = {productId : 0, price : 0, productName : '', avatar: ''};
  cart: Cart = {id: 0, price: 0, quantity: 0};
  cartList: Cart[] = [];
  quantity = 1;

  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private tokenStorageService: TokenStorageService,
              private toast: ToastrService,
              private shareService: ShareService,
              private title: Title) {
    this.title.setTitle('Chi tiết sản phẩm')
    this.activatedRoute.paramMap.subscribe(next => {
      const id = parseInt(<string> next.get('id'));
      console.log(id);
      this.productService.getProduct(id).subscribe(next => {
        this.product = next;
      });
    });

  }

  ngOnInit(): void {
    window.scrollTo(0, 10);
  }

  addToCard(item: Product, quantity1: string) {
    if (this.tokenStorageService.getCart()) {
      this.cartList = this.tokenStorageService.getCart();
        this.cart.id = item.productId;
        this.cart.name = item.productName;
        this.cart.avatar = item.avatar;
        this.cart.price = item.price;
      if (this.tokenStorageService.checkExistName(item.productName)) {
        this.tokenStorageService.upQuantityProductPro(item.productId, this.cartList, parseInt(quantity1));
      } else {
        this.cart.quantity = parseInt(quantity1);
        this.cartList.push(this.cart);
      }
      this.tokenStorageService.setCart(this.cartList);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Thông báo!',
            text: 'Đã thêm sản phẩm '+ this.cart.name +' vào giỏ hàng.',
            showConfirmButton: false,
            timer: 2000
          });
    } else {
      this.cart.id = item.productId;
      this.cart.name = item.productName;
      this.cart.avatar = item.avatar;
      this.cart.price = item.price;
      this.cart.quantity = parseInt(quantity1);
      this.cartList.push(this.cart);
      this.tokenStorageService.setCart(this.cartList);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Thông báo!',
            text: 'Đã thêm sản phẩm '+ this.cart.name +' vào giỏ hàng.',
            showConfirmButton: false,
            timer: 2000
          });
    }
  }

}
