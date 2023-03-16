import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { BodyComponent } from './body/body/body.component';
import { DetailComponent } from './body/detail/detail.component';
import { CartComponent } from './body/cart/cart.component';


@NgModule({
  declarations: [HeaderComponent, FooterComponent, BodyComponent, DetailComponent, CartComponent],
  exports: [
    HeaderComponent,
    FooterComponent,
    BodyComponent,
    DetailComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
