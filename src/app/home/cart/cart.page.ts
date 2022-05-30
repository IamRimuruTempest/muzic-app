import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';

import { CartItem } from 'src/app/models/cart-item';
import { take } from 'rxjs/operators';
import { CartItemDetailed } from 'src/app/models/cart-item-detailed';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  subscription: Subscription;
  products: Array<Product> = [];

  // cartItem: Array<CartItem> = [];
  cartUserDetailed: Array<CartItemDetailed>;
  carts: CartItem[];
  userId: string;
  cartItemId: string;


  cartItem: CartItem = {
    id: '',
    productId: '',
    quantity: 0
  }


  shippingCost: Number = 99.99;
  cartPrice: Number = 0;
  totalPrice: Number = 0;


  element: HTMLElement;
  textInfo: HTMLElement;
  

  
  constructor(
    private dataService: DataService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    // this.cartItemId = this.
    this.userId = this.authService.user.uid
    // get all cart items
    this.dataService
      .getCart(this.userId)
      .subscribe(carts => {
        this.carts = carts;
        console.log("Cart Items;",carts);
        // get all product IDs from cart items  
        const productIds = carts.map((o) => o.productId);
        console.log("Product IDs:", productIds);
        // get Product information from array of product IDs
        this.dataService
          .getProductByIds(productIds)
          .pipe(take(1))
          .subscribe((products) => {
            console.log("Products", products);
            this.cartUserDetailed = products.map((p) => {
              const foundItemInCart = this.carts.find((i) => i.productId === p.productId);
              const price = p.productPrice.toString().replace(/,/g,"");
              this.cartPrice = Number(this.cartPrice) +  Number(price);
              this.cartPrice = Number(this.cartPrice )* Number(foundItemInCart.quantity);
              console.log("Found item in cart:", foundItemInCart)
              return { ...foundItemInCart, ...p };
            });

            console.log("Total Products", this.cartUserDetailed)
            

            this.totalPrice = Number(this.cartPrice) + Number(this.shippingCost);
            console.log("Sub Total ", this.cartPrice)
            console.log("Shipping Cost ", this.shippingCost)
            console.log("Total Cost: ", Number(this.cartPrice) + Number(this.shippingCost));
            
            this.element = document.getElementById("footer");
            this.textInfo = document.getElementById("textInfo");
            if(this.cartUserDetailed.length == 1 || this.cartUserDetailed.length > 1) {
              this.element.style.display = "block";
               this.textInfo.style.display = "none";
            } ;
      
          })
      })

      
      
  }

  //  ionViewDidEnter() {
  //   this.subscription = this.dataService.getCart(this.authService.user.uid)
  //     .subscribe(
  //       (res) => {
  //         this.cartItem = res as CartItem[];
  //       }
  //     );
  // }

  
   async removeCartItem(cartItem: CartItem) {
    await this.dataService.deleteCart(this.authService.user.uid, cartItem);
    console.log("click baby");
  }

  


}
