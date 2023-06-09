import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { BodyComponent } from './body/body/body.component';
import { DetailComponent } from './body/detail/detail.component';
import { CartComponent } from './body/cart/cart.component';
import { ErrorComponent } from './error/error.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PaymentComponent } from './body/payment/payment.component';
import { IntroduceComponent } from './layout/introduce/introduce.component';


@NgModule({
  declarations: [HeaderComponent, FooterComponent, BodyComponent, DetailComponent, CartComponent, ErrorComponent, PaymentComponent, IntroduceComponent],
  exports: [
    HeaderComponent,
    FooterComponent,
    BodyComponent,
    DetailComponent,
    CartComponent
  ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class HomeModule { }
