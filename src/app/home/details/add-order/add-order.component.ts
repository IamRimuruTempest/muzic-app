import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Product } from 'src/app/models/product';
import { Cart } from 'src/app/models/cart';
import { DataService } from 'src/app/services/data.service';
import { Observable } from 'rxjs';
import {
  ModalController,
  PopoverController,
  ToastController,
  AlertController
} from '@ionic/angular';
import { CartItem } from 'src/app/models/cart-item';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss'],
})
export class AddOrderComponent implements OnInit {

 quantity: number = 1;
  priceProduct: Number = 0;

 productId: string;
  product: Product = {
    productName: '',
    productCategory: '',
    productColor	: '',
    productDescription: '',
    productPrice: 0
  }


  cartItem: CartItem = {
    productId: this.product.productId,
    // cartId: this.cartId,
    quantity: this.quantity
  }


  constructor(
    private dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
  ) { }

  ngOnInit() {
    this.productId = this.activatedRoute.snapshot.params.productId;
    this.cartItem.productId = this.productId
    console.log("Product ID:", this.productId);
    this.dataService.getProductById(this.productId).subscribe(product => {
      console.log(product);
      this.product = product as Product;
    });
  }

  addToOrder() {
   this.dataService
    .addToOrder(this.authService.user.uid, this.cartItem) 
    .then(
      () => {
        this.modalCtrl.dismiss();
      }
    )
  }

   clickUp() {
    this.quantity = this.quantity + 1;
    this.cartItem.quantity = this.quantity;
    console.log("Quantity " ,this.cartItem.quantity);
  }

  clickDown() {
    this.quantity = this.quantity - 1;
    if(this.quantity == 0) {
      this.quantity = 1;
    }
    this.cartItem.quantity = this.quantity;
    console.log("Quantity " ,this.cartItem.quantity);
  }
}
