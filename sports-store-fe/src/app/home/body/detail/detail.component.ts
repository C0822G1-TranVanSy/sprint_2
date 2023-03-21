import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../../service/product/product.service';
import {Product} from '../../../entity/product/product';
import {ActivatedRoute} from '@angular/router';
import {ProductDto} from '../../../entity/product/product-dto';
import {TokenStorageService} from '../../../service/security/token-storage.service';
import {ToastrService} from 'ngx-toastr';
import {ShareService} from '../../../service/security/share.service';
import {Cart} from '../../../entity/order/cart';

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
              private shareService: ShareService) {
    this.activatedRoute.paramMap.subscribe(next => {
      const id = parseInt(<string> next.get('id'));
      console.log(id);
      this.productService.getProduct(id).subscribe(next => {
        this.product = next;
      });
    });

  }

  ngOnInit(): void {
    window.scrollTo(0, 250);
  }

  addToCard(item: Product) {
    if (this.tokenStorageService.getCart()) {
      this.cartList = this.tokenStorageService.getCart();
        this.cart.id = item.productId;
        this.cart.name = item.productName;
        this.cart.avatar = item.avatar;
        this.cart.price = item.price;
      if (this.tokenStorageService.checkExistName(item.productName)) {
        this.tokenStorageService.upQuantityProduct(item.productId, this.cartList);
      } else {
        this.cart.quantity = 1;
        this.cartList.push(this.cart);
      }
      this.tokenStorageService.setCart(this.cartList);
      this.toast.success('Đã thêm sản phẩm ' + this.cart.name + ' vào giỏ hàng.', 'Thông báo');
    } else {
      this.cart.id = item.productId;
      this.cart.name = item.productName;
      this.cart.avatar = item.avatar;
      this.cart.price = item.price;
      this.cart.quantity = 1;
      this.cartList.push(this.cart);
      this.tokenStorageService.setCart(this.cartList);
      this.toast.success('Đã thêm sản phẩm ' + this.cart.name + ' vào giỏ hàng.', 'Thông báo');
    }
  }

}
