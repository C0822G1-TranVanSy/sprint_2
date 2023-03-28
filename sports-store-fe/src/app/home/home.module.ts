import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { BodyComponent } from './body/body/body.component';
import { DetailComponent } from './body/detail/detail.component';
import { CartComponent } from './body/cart/cart.component';
import { ErrorComponent } from './error/error.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [HeaderComponent, FooterComponent, BodyComponent, DetailComponent, CartComponent, ErrorComponent],
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
        FormsModule
    ]
})
export class HomeModule { }
