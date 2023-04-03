import {Component, HostListener, OnInit} from '@angular/core';
import {ProductService} from '../../../service/product/product.service';
import {ProductDto} from '../../../entity/product/product-dto';
import {ViewportScroller} from '@angular/common';
import {Cart} from '../../../entity/order/cart';
import {TokenStorageService} from '../../../service/security/token-storage.service';
import {ToastrService} from 'ngx-toastr';
import {ShareService} from '../../../service/security/share.service';
import Swal from "sweetalert2";
import {ActivatedRoute} from '@angular/router';
import {Product} from '../../../entity/product/product';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  cart: Cart = {productId: 0, price: 0, quantity: 0};
  productList: ProductDto[] = [];
  bestProductList: ProductDto[] = [];
  bestPage: any;
  numberPage: number = 0;
  totalPages = 0;
  size: number = 4;
  number: number = 0;
  pageYoffSet =0;
  last: any;
  first: any;
  role = '';
  productIdDelete = 0;
  productNameDelete = '';
  productName= '';
  productPage: any;

  constructor(private productService: ProductService,
              private scroll: ViewportScroller,
              private tokenStorageService: TokenStorageService,
              private toast: ToastrService,
              private shareService: ShareService,
              private activatedRoute: ActivatedRoute) {
    // this.shareService.getClickEvent().subscribe(next => {
    //   this.searchAllProductByProductName(this.size);
    // })
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
    this.searchAllProductByProductName(this.size);
    this.getBestProduct(this.number)
  }

  searchAllProductByProductName(size: number){
    this.productService.searchAllProductByProductName(size, this.productName).subscribe(data => {
      this.productPage = data;
      if(data){
        this.productList = this.productPage.content;
        this.numberPage = data.number;
        this.size = data.size;
        this.totalPages = data.totalPages;
        this.first = data.first;
        this.last = data.last;
      }
    })
  }

  // getPageAllProduct(size: number){
  //   this.productService.getPageAllProduct(size).subscribe(data => {
  //     this.productList = data.content;
  //     this.numberPage = data.number;
  //     this.size = data.size;
  //     this.totalPages = data.totalPages;
  //     this.first = data.first;
  //     this.last = data.last;
  //   })
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
      this.searchAllProductByProductName(this.size);
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

  getBestProduct(size: number){
      this.productService.getBestProduct(size).subscribe(data => {
        console.log(data);
        if(data){
          this.bestPage = data;
          this.first = data.first;
          this.last = data.last;
          this.bestProductList = data.content;
        }
      })
  }

  getItemProduct(productId: number, productName: string) {
      this.productIdDelete = productId;
      this.productNameDelete = productName;
  }
}
