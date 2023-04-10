import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Category} from '../../entity/product/category';
import {AngularFireStorage} from '@angular/fire/storage';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../../service/product/category.service';
import {ProductService} from '../../service/product/product.service';
import {finalize} from 'rxjs/operators';
import Swal from 'sweetalert2';
import {ProductDto} from '../../entity/product/product-dto';
import {Product} from '../../entity/product/product';
import {Observable} from 'rxjs';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  formUpdate: FormGroup;
  categoryList: Category[] = [];
  selectedImage: any = null;
  categoryId = '';
  selectedFileUrl: any;
  product: Product = {productId : 0, price : 0,description:'', productName : '', avatar: ''};
  downloadURL: Observable<string> | undefined;
  src: string | undefined;

  constructor(@Inject(AngularFireStorage) private storage: AngularFireStorage,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private categoryService: CategoryService,
              private productService: ProductService,
              private title: Title) {
    this.title.setTitle('Chỉnh sửa sản phẩm');
    this.activatedRoute.paramMap.subscribe(next => {
      const id = parseInt(<string> next.get("id"));
      this.productService.getProduct(id).subscribe(next => {
        console.log(next);
          this.product = next;
        this.src = next.avatar;

        this.formUpdate.patchValue(this.product);
      })
    })
    this.categoryService.getAllCategory().subscribe(next => {
      this.categoryList = next;

    });

    this.formUpdate = new FormGroup({
      productId: new FormControl(),
      productName: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required, Validators.pattern('[\\d]+')]),
      avatar: new FormControl(),
      category: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    window.scrollTo(0, 10);
  }

  // tslint:disable-next-line:typedef
  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
    var n = Date.now();
    // Nơi lưu
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, this.selectedImage);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              // lấy lại url
              this.product.avatar = url;
            }
            this.src = url;
          });
        })
      )
      .subscribe(url => {
        if (url) {
          // in url ra
          console.log('url :', url);
        }
      });
  }

  updateProduct() {
    // upload image to firebase
    if (this.selectedImage == null && this.formUpdate.valid){
      this.productService.updateProduct(this.formUpdate.value).subscribe(() => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Thông báo!',
          text: 'Chỉnh sửa sản phẩm thành công.',
          showConfirmButton: false,
          timer: 2000
        });
      }, error => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Thông báo!',
            text: 'Chỉnh sửa sản phẩm thất bại.',
            showConfirmButton: false,
            timer: 2000
          });
        });
    }else {
    const nameImg = this.selectedImage.name;
    const fileRef = this.storage.ref(nameImg);
    this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.formUpdate.patchValue({avatar: url});
          // Call API to create vaccine
          if (this.formUpdate.valid) {
            this.productService.updateProduct(this.formUpdate.value).subscribe(() => {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Thông báo!',
                text: 'Chỉnh sửa phẩm thành công.',
                showConfirmButton: false,
                timer: 2000
              });
            }, error => {
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Thông báo!',
                text: 'Chỉnh sửa phẩm thất bại.',
                showConfirmButton: false,
                timer: 2000
              });
            });
          }
        });
      })
    ).subscribe();}
  }

  compareFn(item1: Category, item2: Category) {
    return item1 && item2 ? item1.categoryId === item2.categoryId : item1 === item2;
  }

}
