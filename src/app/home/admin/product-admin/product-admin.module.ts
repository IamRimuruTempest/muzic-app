import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductAdminPageRoutingModule } from './product-admin-routing.module';

import { ProductAdminPage } from './product-admin.page';
import { AddProductComponent } from './add-product/add-product.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ProductAdminPageRoutingModule
  ],
  declarations: [ProductAdminPage, AddProductComponent]
})
export class ProductAdminPageModule {}
