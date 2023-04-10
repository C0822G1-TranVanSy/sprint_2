import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenStorageService} from '../../service/security/token-storage.service';
import {SecurityService} from '../../service/security/security.service';
import {ToastrService} from 'ngx-toastr';
import {ViewportScroller} from '@angular/common';
import {ShareService} from '../../service/security/share.service';
import Swal from 'sweetalert2';
import {OrderService} from '../../service/cart/order.service';
import {Orders} from '../../entity/order/orders';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage = '';
  roles: string[] = [];
  returnUrl = '/';
  errors = {username: '', password: ''};
  pageYoffSet = 0;
  order: Orders = {orderId: 0, accountId: 0};
  //dangky
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessageRegister = '';
  isSubmited = false;
  formRegister: FormGroup;
  formLogin = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)]),
    rememberMe: new FormControl(false)
  });


  comparePassword(control: AbstractControl) {
    const password = control.value;
    return (password.password === password.confirmPassword) ? null : {passwordNotMatch: true};
  }

  constructor(private router: Router,
              private tokenStorageService: TokenStorageService,
              private route: ActivatedRoute,
              private securityService: SecurityService,
              private shareService: ShareService,
              private toast: ToastrService,
              private scroll: ViewportScroller,
              private orderService: OrderService,
              private title: Title
  ) {
    this.title.setTitle('Đăng nhập');
    this.formRegister = new FormGroup({
        username: new FormControl('', [Validators.required]),
        pwGroup: new FormGroup({
          password: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(32)]),
          confirmPassword: new FormControl('')
        }, [this.comparePassword]),
        email: new FormControl('', [Validators.required]),
        name: new FormControl('', [Validators.required]),
      }
    );
  }


  ngOnInit(): void {
    window.scrollTo(0, 10);
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/body';
    if (this.tokenStorageService.getToken()) {
      this.securityService.isLoggedIn = true;
      this.roles = this.tokenStorageService.getRole();
      const username = this.tokenStorageService.getUsername();
    }

  }

  login() {
    this.errors = {username: '', password: ''};
    this.errorMessage = '';
    if (this.formLogin.valid) {
      this.securityService.login(this.formLogin.value).subscribe(
        data => {
          console.log(data);
          if (this.formLogin.value.rememberMe) {
            this.tokenStorageService.saveTokenLocal(data.token);
            this.tokenStorageService.saveUserLocal(data, data.email, data.id, data.username, data.name, data.roles, data.avatar);
          } else {
            this.tokenStorageService.saveTokenSession(data.token);
            this.tokenStorageService.saveUserSession(data, data.email, data.id, data.username, data.name, data.roles, data.avatar);
          }
          const user = this.tokenStorageService.getUser();
          this.securityService.setIsLoggedIn(user, true);
          this.shareService.sendClickEvent();
          const username = this.tokenStorageService.getUsername();
          this.roles = this.tokenStorageService.getRole();
          this.router.navigateByUrl('body');
          this.formLogin.reset();
          if (this.tokenStorageService.getRole()[0] != 'ROLE_ADMIN') {
            this.orderService.createCart(parseInt(this.tokenStorageService.getIdAccount())).subscribe();
          }
          this.orderService.findOrderByAccountId(parseInt(data.id)).subscribe(next => {
            this.order = next;
            this.orderService.addCartLocal(this.tokenStorageService.getCart(), this.order.orderId).subscribe(next => {
                this.tokenStorageService.removeCart();
                this.shareService.sendClickEvent();
              }
            );
          });
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Thông báo!',
            text: 'Đăng nhập thành công',
            showConfirmButton: false,
            timer: 2000
          });
        }, error => {
          if (error.status == 406) {
            this.errorMessage = error.error.message;
            this.toast.error(this.errorMessage, 'Thất bại'
              , {positionClass: 'toast-top-center'});
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Thông báo!',
              text: 'Đăng nhập thất bại',
              showConfirmButton: false,
              timer: 2000
            });
          }
          this.securityService.isLoggedIn = false;
          if (error.error.errors) {
            for (let i = 0; i < error.error.errors.length; i++) {
              if (error.error.errors && error.error.errors[i].field === 'username') {
                this.errors.username = error.error.errors[i].defaultMessage;
              }
              if (error.error.errors && error.error.errors[i].field === 'password') {
                this.errors.password = error.error.errors[i].defaultMessage;
              }
            }
          }
        }
      );
    }
  }

  register() {
    if (this.formRegister.invalid) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Thông báo!',
        text: 'Không đúng định dạng',
        showConfirmButton: false,
        timer: 2000
      });
    } else {
      this.isSubmited = true;
      this.securityService.register(this.formRegister.value).subscribe(
        data => {
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Thông báo!',
            text: 'Đăng ký thành công',
            showConfirmButton: false,
            timer: 2000
          });
          this.router.navigateByUrl('/security/login');
          // @ts-ignore
          document.getElementById("alo").click();
          this.formRegister.reset();
          this.isSubmited = false;
        },
        err => {
          console.log(err);
          this.errorMessageRegister = err.error.message;
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Thông báo!',
            text: this.errorMessageRegister,
            showConfirmButton: false,
            timer: 2000
          });
          this.isSignUpFailed = true;
          this.isSubmited = false;
        }
      );
    }
  }
}
