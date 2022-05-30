import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductCategoryPageRoutingModule } from './product-category-routing.module';

import { ProductCategoryPage } from './product-category.page';

import { AddCategoryComponent } from './add-category/add-category.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductCategoryPageRoutingModule
  ],
  declarations: [
    ProductCategoryPage,
    AddCategoryComponent
  ]
})
export class ProductCategoryPageModule {}
