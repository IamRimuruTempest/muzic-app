import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { first } from 'rxjs/operators';

import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper';
import Swiper, { SwiperOptions } from 'swiper';

import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { Product } from 'src/app/models/product';
import { Account } from 'src/app/models/user';

import { limit } from '@angular/fire/firestore';

SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom]);

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.page.html',
  styleUrls: ['./home-page.page.scss'],
  encapsulation: ViewEncapsulation.None 
})
export class HomePagePage implements OnInit {

   defaultVal = {
    userType: '',
    userEmail: '',
    userFirstname: '',
    userLastname: '',
    userAddress: '',
    userPhone: '',
  };
  account: Account = this.defaultVal;
  accountSubs: Subscription;

  myDate = new Date();
  hrs = this.myDate.getHours()

  greet: string;

  products: Array<Product> = [];
  newArrival : Array<Product> = [];
  subscription: Subscription;

  constructor(
    private authService: AuthService,
    private dataService: DataService,
  ) { }

  ngOnInit() {
     this.accountSubs = this.authService.userAccount.subscribe((acc) => {
      this.account = acc;
    });
   
    if (this.hrs < 12)
        this.greet = 'Good Morning';
    else if (this.hrs >= 12 && this.hrs <= 17)
        this.greet = 'Good Afternoon';
    else if (this.hrs >= 17 && this.hrs <= 24)
        this.greet = 'Good evening';



    
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
