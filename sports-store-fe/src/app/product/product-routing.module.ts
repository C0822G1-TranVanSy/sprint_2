import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateProductComponent} from './create-product/create-product.component';
import {SearchProductComponent} from './search-product/search-product.component';
import {UpdateProductComponent} from './update-product/update-product.component';
import {AdminGuard} from '../authguard/admin.guard';

const routes: Routes = [
  {path: "create",component: CreateProductComponent, canActivate: [AdminGuard]},
  {path: "search/:categoryId",component: SearchProductComponent},
  {path: "update/:id",component: UpdateProductComponent, canActivate: [AdminGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
