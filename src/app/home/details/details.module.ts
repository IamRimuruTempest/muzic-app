import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsPageRoutingModule } from './details-routing.module';

import { DetailsPage } from './details.page';

import { AddOrderComponent } from './add-order/add-order.component';
import { AddCartComponent } from './add-cart/add-cart.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsPageRoutingModule,

  ],
  declarations: [
    DetailsPage,
    AddOrderComponent,
    AddCartComponent]
})
export class DetailsPageModule {}
