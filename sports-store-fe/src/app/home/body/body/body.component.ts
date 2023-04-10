import {Component, HostListener, OnInit} from '@angular/core';
import {ProductService} from '../../../service/product/product.service';
import {ProductDto} from '../../../entity/product/product-dto';
import {ViewportScroller} from '@angular/common';
import {Cart} from '../../../entity/order/cart';
import {TokenStorageService} from '../../../service/security/token-storage.service';
import {ToastrService} from 'ngx-toastr';
import {ShareService} from '../../../service/security/share.service';
import Swal from 'sweetalert2';
import {ActivatedRoute} from '@angular/router';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {Warehouse} from '../../../entity/warehouse/warehouse';
import {WarehouseService} from '../../../service/warehouse/warehouse.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  cart: Cart = {productId: 0, price: 0, quantity: 0};
  productList: ProductDto[] = [];
  bestProductList1: ProductDto[] = [];
  bestProductList2: ProductDto[] = [];
  bestProductList3: ProductDto[] = [];
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
  formPrice: FormGroup;
  search = 0;

  constructor(private productService: ProductService,
              private scroll: ViewportScroller,
              private tokenStorageService: TokenStorageService,
              private toast: ToastrService,
              private shareService: ShareService,
              private activatedRoute: ActivatedRoute,
              private title: Title,
              private warehouseService: WarehouseService) {
    this.title.setTitle('Sports')
    this.formPrice = new FormGroup({
      checkArray: new FormArray([]),
    })
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
    window.scrollTo(0, 10);
    this.searchPrice(this.formPrice.value, this.size)
    this.getBestProduct();
  }


  searchAllProductByProductName(size: number){
    this.productService.searchAllProductByProductName(size, this.productName, this.formPrice.value).subscribe(data => {
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

  getBestProduct(){
      this.productService.getBestProduct(0).subscribe(data => {
        if(data){
          this.bestPage = data;
          this.first = data.first;
          this.last = data.last;
          this.bestProductList1 = data.content;
        }
      })
    this.productService.getBestProduct(1).subscribe(data => {
      if(data){
        this.bestPage = data;
        this.first = data.first;
        this.last = data.last;
        this.bestProductList2 = data.content;
      }
    })
    this.productService.getBestProduct(2).subscribe(data => {
      if(data){
        this.bestPage = data;
        this.first = data.first;
        this.last = data.last;
        this.bestProductList3 = data.content;
      }
    })
  }
  // getBestProduct1(){
  //     this.productService.getBestProduct(1).subscribe(data => {
  //       if(data){
  //         this.bestPage = data;
  //         this.first = data.first;
  //         this.last = data.last;
  //         this.bestProductList2 = data.content;
  //       }
  //     })
  // }


  getItemProduct(productId: number, productName: string) {
      this.productIdDelete = productId;
      this.productNameDelete = productName;
  }

  searchPrice(e: any, size: number) {
    const checkArray: FormArray= this.formPrice.get('checkArray') as FormArray;
    if(e.target && e.target.checked){
      checkArray.push(new FormControl(e.target.value))
    }else {
      for (let i = 0; i < checkArray.length; i++) {
        if(checkArray.value[i] == e.target.value){
          checkArray.removeAt(i);
        }
      }
    }
    this.productService.searchAllProductByProductName(size, this.productName,this.formPrice.value.checkArray).subscribe(
      data => {
        this.productPage = data;
        console.log(data);
        this.search = 0;
        if(data){
          this.productList = this.productPage.content;
          this.search = data.totalElements;
          this.numberPage = data.number;
          this.size = data.size;
          this.totalPages = data.totalPages;
          this.first = data.first;
          this.last = data.last;
        }
      }
    )
  }
}
