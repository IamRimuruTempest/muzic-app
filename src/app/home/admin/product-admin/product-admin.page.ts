import { Component, OnInit } from '@angular/core';
import { Platform, } from '@ionic/angular';
import { collection } from '@angular/fire/firestore';

import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";

import { ToastController, AlertController , ModalController } from '@ionic/angular';


import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { Product } from 'src/app/models/product';

import { AddProductComponent } from 'src/app/home/admin/product-admin/add-product/add-product.component';

@Component({
  selector: 'app-product-admin',
  templateUrl: './product-admin.page.html',
  styleUrls: ['./product-admin.page.scss'],
})


export class ProductAdminPage implements OnInit {
  products: Array<Product> = [];
  subscription: Subscription;

  // product: Product;
  
  constructor(
    private dataService: DataService,
  ) {     
  }

  

  ngOnInit() {
  
  } 


  ionViewDidEnter() {
    this.subscription = this.dataService.getProducts()
      .subscribe(
        (res) => {
          this.products = res as Product[];
        }
      );
  }
}
