import {Component, HostListener, OnInit} from '@angular/core';
import {ProductService} from '../../../service/product/product.service';
import {ProductDto} from '../../../entity/product/product-dto';
import {ViewportScroller} from '@angular/common';
import {Cart} from '../../../entity/order/cart';
import {TokenStorageService} from '../../../service/security/token-storage.service';
import {ToastrService} from 'ngx-toastr';
import {ShareService} from '../../../service/security/share.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  cart: Cart = {id: 0, price: 0, quantity: 0};
  cartList: Cart[] = [];
  productList: ProductDto[] = [];
  numberPage: number = 0;
  totalPages = 0;
  size: number = 4;
  pageYoffSet =0;
  last: any;
  first: any;
  role = '';
  productIdDelete = 0;
  productNameDelete = '';

  constructor(private productService: ProductService,
              private scroll: ViewportScroller,
              private tokenStorageService: TokenStorageService,
              private toast: ToastrService,
              private shareService: ShareService) {
    if(this.tokenStorageService.getRole()){
      this.role = this.tokenStorageService.getRole()[0];
    }
  }

  @HostListener('window:scroll', ['$event']) onScroll() {
    this.pageYoffSet = window.pageYOffset;
  }

  // tslint:disable-next-line:typedef
  scrollToBlog() {
    this.scroll.scrollToPosition([0, 500]);
  }

  ngOnInit(): void {
    this.getPageAllProduct(this.size);
    this.shareService.getClickEvent().subscribe(next => {
      this.cartList = this.tokenStorageService.getCart();
    })
  }

  getPageAllProduct(size: number){
    this.productService.getPageAllProduct(size).subscribe(data => {
      this.productList = data.content;
      this.numberPage = data.number;
      this.size = data.size;
      this.totalPages = data.totalPages;
      this.first = data.first;
      this.last = data.last;
    })
  }

  getAllProduct(){
    this.productService.getAllProduct().subscribe(next => {
      this.productList = next;
    })
  }

  // addToCard(item: ProductDto) {
  //   if (this.tokenStorageService.getCart()) {
  //     this.cartList = this.tokenStorageService.getCart();
  //     this.cart.id = item.productId;
  //     this.cart.name = item.productName;
  //     this.cart.avatar = item.avatar;
  //     this.cart.price = item.price;
  //     if (this.tokenStorageService.checkExistName(item.productName)) {
  //       this.tokenStorageService.upQuantityProduct(item.productId, this.cartList)
  //     } else {
  //       this.cart.quantity = 1;
  //       this.cartList.push(this.cart);
  //     }
  //     this.tokenStorageService.setCart(this.cartList);
  //     this.toast.success('Đã thêm sản phẩm '+ this.cart.name +' vào giỏ hàng.','Thông báo')
  //     Swal.fire({
  //       position: 'center',
  //       icon: 'success',
  //       title: 'Thông báo!',
  //       text: 'Đã thêm sản phẩm '+ this.cart.name +' vào giỏ hàng.',
  //       showConfirmButton: false,
  //       timer: 2000
  //     });
  //   } else {
  //     this.cart.id = item.productId;
  //     this.cart.name = item.productName;
  //     this.cart.avatar = item.avatar;
  //     this.cart.price = item.price;
  //     this.cart.quantity = 1;
  //     this.cartList.push(this.cart);
  //     this.tokenStorageService.setCart(this.cartList);
  //     this.toast.success('Đã thêm sản phẩm '+ this.cart.name +' vào giỏ hàng.','Thông báo')
  //   }
  // }

  removeProduct(productId: number) {
    this.productService.deleteProduct(productId).subscribe(next => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Thông báo!',
        text: 'Đã xóa sản phẩm thành công.',
        showConfirmButton: false,
        timer: 2000
      });
      this.getPageAllProduct(this.size);
    }, error => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Thông báo!',
        text: 'Xóa thất bại.',
        showConfirmButton: false,
        timer: 2000
      });
    })
  }


  getItemProduct(productId: number, productName: string) {
      this.productIdDelete = productId;
      this.productNameDelete = productName;
  }
}
