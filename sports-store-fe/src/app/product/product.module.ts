import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { CreateProductComponent } from './create-product/create-product.component';
import {ReactiveFormsModule} from '@angular/forms';
import { SearchProductComponent } from './search-product/search-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';


@NgModule({
  declarations: [CreateProductComponent, SearchProductComponent, UpdateProductComponent],
    imports: [
        CommonModule,
        ProductRoutingModule,
        ReactiveFormsModule
    ]
})
export class ProductModule { }
