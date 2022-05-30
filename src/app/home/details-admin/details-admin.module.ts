import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsAdminPageRoutingModule } from './details-admin-routing.module';

import { DetailsAdminPage } from './details-admin.page';

import { EditProductComponent } from './edit-product/edit-product.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsAdminPageRoutingModule
  ],
  declarations: [DetailsAdminPage, EditProductComponent]
})
export class DetailsAdminPageModule {}
