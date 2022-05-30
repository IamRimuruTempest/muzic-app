import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { AuthService } from 'src/app/services/auth.service';
import { Product } from 'src/app/models/product';
import { CartItem } from 'src/app/models/cart-item';
import { AlertController, ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-cart',
  templateUrl: './add-cart.component.html',
  styleUrls: ['./add-cart.component.scss'],
})
export class AddCartComponent implements OnInit {

  // @Input() product: Product;

  quantity: number = 1;
  priceProduct: Number = 0;

 productId: string;
  product: Product = {
    productName: '',
    productCategory: '',
    productColor	: '',
    productDescription: '',
    productPrice: 0,
  }


  cartItem: CartItem = {
    productId: this.product.productId,
    // cartId: this.cartId,
    quantity: this.quantity
  }

  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private modalCtrl: ModalController,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.productId = this.activatedRoute.snapshot.params.productId;
    this.cartItem.productId = this.productId
    console.log("Product ID:", this.productId);
    this.dataService.getProductById(this.productId).subscribe(product => {
      console.log(product);
      this.product = product as Product;
    });

    // let price = this.product.productPrice;
    // const priceRemoveString = this.product.productPrice.toString().replace(/,/g,"");
    // price = Number(priceRemoveString) * Number(this.quantity);
    console.log("Quantity " , this.quantity  )
  }

  // addToCart() {
  //    this.dataService
  //     .addToCart(this.authService.user.uid, this.product)
  //     .then(
  //       () => {
  //         // console.log(this.productId);
  //         this.modalCtrl.dismiss();
  //       }
  //     )
  // } 

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

  addToCart() {
   this.dataService
    .addToCart(this.authService.user.uid, this.cartItem) 
    .then(
      () => {
        this.modalCtrl.dismiss();
      }
    )
  }

}
