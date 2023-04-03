import {Component, Inject, OnInit} from '@angular/core';
import {TokenStorageService} from '../../service/security/token-storage.service';
import {ShareService} from '../../service/security/share.service';
import {OrderService} from '../../service/cart/order.service';
import {ToastrService} from 'ngx-toastr';
import {SecurityService} from '../../service/security/security.service';
import {Router} from '@angular/router';
import {Account} from '../../entity/account/account';
import {finalize} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage';
import Swal from 'sweetalert2';
import {Orders} from '../../entity/order/orders';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  account: Account = {
    accountId: 0, username: '',
    email: '', phoneNumber: '', address: '', name: '', avatar: ''
  };
  namePro = '';

  selectedImage: any = null;
  categoryId = '';
  selectedFileUrl: any;
  downloadURL: Observable<string> | undefined;
  src: string ='';
  index = 1;
  orderList: Orders[] = [];

  constructor(@Inject(AngularFireStorage) private storage: AngularFireStorage,
              private tokenStorageService: TokenStorageService,
              private shareService: ShareService,
              private orderService: OrderService,
              private toast: ToastrService,
              private securityService: SecurityService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getInfoByAccountId();
    this.getOrderPurchase();
    window.scrollTo(0, 10);
  }

  getOrderPurchase() {
    const id = parseInt(this.tokenStorageService.getIdAccount());
    this.orderService.findOrderPurchaseByAccountId(id).subscribe(next => {
      if(next){
        this.orderList = next.content;
        console.log(this.orderList);
      }
    })
  }

  getInfoByAccountId() {
    const id = parseInt(this.tokenStorageService.getIdAccount());
    this.securityService.getInfoByAccountId(id).subscribe(next => {
      this.account = next;
      this.getNamePro(this.account);
    });
  }

  getNamePro(account: Account) {
    let str = account.name.split(' ');
    this.namePro = str[str.length - 1];
    for (let i = 0; i < str.length - 1; i++) {
      this.namePro += str[i].charAt(0);
    }
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
              this.account.avatar = url;
            }
            this.src = url;
            console.log(this.src);
            this.securityService.updateAvatar( this.account.accountId, this.src).subscribe(() => {
              this.shareService.sendClickEvent();
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Thông báo!',
                text: 'Chỉnh sửa ảnh thành công.',
                showConfirmButton: false,
                timer: 2000
              });
            }, error => {
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Thông báo!',
                text: 'Chỉnh sửa ảnh thất bại.',
                showConfirmButton: false,
                timer: 2000
              });
            });
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

  changeIndex(number: number) {
    this.index = number;
  }
}
