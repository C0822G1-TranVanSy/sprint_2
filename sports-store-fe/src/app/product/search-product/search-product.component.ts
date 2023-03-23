import {Component, HostListener, OnInit} from '@angular/core';
import {ProductService} from '../../service/product/product.service';
import {ProductDto} from '../../entity/product/product-dto';
import {Cart} from '../../entity/order/cart';
import {ActivatedRoute} from '@angular/router';
import {CategoryService} from '../../service/product/category.service';
import {TokenStorageService} from '../../service/security/token-storage.service';
import Swal from "sweetalert2";
import {ViewportScroller} from "@angular/common";

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})
export class SearchProductComponent implements OnInit {
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
  categoryId =0;
  productId = 0;
  productName = '';
  categoryName = '';
  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private categoryService: CategoryService,
              private tokenStorageService: TokenStorageService,
              private scroll: ViewportScroller) {
    if(this.tokenStorageService.getRole()){
      this.role = this.tokenStorageService.getRole()[0];
    }

    this.activatedRoute.paramMap.subscribe(next => {
      this.categoryId = parseInt(<string> next.get('categoryId'));
      this.productService.searchProductByCategory(this.size,this.categoryId).subscribe(next => {
        this.productList = next.content;
        this.numberPage = next.number;
        this.size = next.size;
        this.totalPages = next.totalPages;
        this.first = next.first;
        this.last = next.last;
      });
      this.categoryService.getCategoryName(this.categoryId).subscribe(next => {
        this.categoryName = next;
      },error => {
        if(error.error){
          this.categoryName = error.error.text;
        }
      })
      if(this.categoryId == 0){
        this.categoryName = 'Tất cả sản phẩm';
      }
    })
  }

  ngOnInit(): void {
    window.scrollTo(0, 60);
  }

  getItemProduct(productId: number, productName: string) {
    this.productId = productId;
    this.productName = productName;
  }

  searchProductByCategory(size: number, id: number) {
    this.productService.searchProductByCategory(size,id).subscribe(next => {
      this.productList = next.content;
      this.numberPage = next.number;
      this.size = next.size;
      this.totalPages = next.totalPages;
      this.first = next.first;
      this.last = next.last;
    })
  }

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
      this.searchProductByCategory(this.size, this.categoryId);
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
  @HostListener('window:scroll', ['$event']) onScroll() {
    this.pageYoffSet = window.pageYOffset;
  }

  scrollToBlog() {
    this.scroll.scrollToPosition([0, 60]);
  }
}
