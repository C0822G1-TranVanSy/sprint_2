import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AngularFireStorage} from '@angular/fire/storage';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../../service/product/category.service';
import {Category} from '../../entity/product/category';
import {finalize} from 'rxjs/operators';
import {ProductService} from '../../service/product/product.service';
import Swal from "sweetalert2";
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  formAdd: FormGroup;
  categoryList: Category[] = [];
  selectedImage: any = null;
  categoryId ='';
  selectedFileUrl: any;

  constructor(@Inject(AngularFireStorage) private storage: AngularFireStorage,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private categoryService: CategoryService,
              private productService: ProductService,
              private title: Title) {
    this.title.setTitle('Thêm sản phẩm')
    this.categoryService.getAllCategory().subscribe(next => {
      this.categoryList = next;
    })

    this.formAdd = new FormGroup({
      productId: new FormControl(),
      productName: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required, Validators.pattern('[\\d]+')]),
      abc: new FormControl(),
      avatar: new FormControl(),
      categoryId: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    window.scrollTo(0, 10);
  }

  // tslint:disable-next-line:typedef
  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.selectedFileUrl = reader.result as string;
    };
    reader.readAsDataURL(this.selectedImage);
  }

  addProduct() {
    // upload image to firebase
    const nameImg = this.selectedImage.name;
    const fileRef = this.storage.ref(nameImg);
    this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.formAdd.patchValue({avatar: url});
          // Call API to create vaccine
          if(this.formAdd.valid){
          this.productService.createProduct(this.formAdd.value).subscribe(() => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Thông báo!',
              text: 'Thêm sản phẩm thành công.',
              showConfirmButton: false,
              timer: 2000
            });
            this.formAdd.reset();
            this.selectedFileUrl = null;
            // this.router.navigateByUrl('class/create/info/'+this.clazz.clazzId);
          });}
        });
      })
    ).subscribe();
  }
}
