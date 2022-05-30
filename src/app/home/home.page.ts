/* eslint-disable @typescript-eslint/naming-convention */
import { StorageService } from './../services/storage.service';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User_Type } from '../enums/account-type.enum';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { Account } from 'src/app/models/user';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  userLinks = [
    {
      tab: 'hero',
      icon: 'home-outline',
      title: 'Home',
    },
    {
      tab: 'product',
      icon: 'headset-outline',
      title: 'Products',
    },
    {
      tab: 'cart',
      icon: 'cart-outline',
      title: 'Cart',
    },
    {
      tab: 'order',
      icon: 'bag-handle-outline',
      title: 'Order',
    },
    {
      tab: 'profile',
      icon: 'person-circle-outline',
      title: 'Account',
    }
  ];
  adminLinks = [
    {
      tab: 'dashboard',
      icon: 'apps-outline',
      title: 'Dashboard',
    },
    {
      tab: 'product-admin',
      icon: 'headset-outline',
      title: 'Products',
    },
    {
      tab: 'orders',
      icon: 'bag-handle-outline',
      title: 'Orders',
    },
    {
      tab: 'users',
      icon: 'people-outline',
      title: 'Users ',
    },
    {
      tab: 'profile-admin',
      icon: 'person-circle-outline',
      title: 'Profile',
    },
  ];
  parsedLinks = [
    {
      tab: '',
      icon: '',
      title: '',
    },
  ];
  tab: string;
  
  userAccount: Account = {
    userType: '',
    userEmail: '',
    userFirstname: '',
    userLastname: '',
    userAddress: '',
    userPhone: '',
    imageUrl: '',
  };
  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router,
    
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.authService.userAccount.subscribe((acc) => {
      this.userAccount = acc;
      if (acc.userType === User_Type.ADMIN) {
        this.parsedLinks = this.adminLinks;
        this.tab = '/home/dashboard';
      } else if (acc.userType === User_Type.USER) {
        this.parsedLinks = this.userLinks;
        this.tab = '/home/hero';
      }
    });
  }
  ionViewDidEnter() {
    this.router.navigate([this.tab]);
  }
  ionViewDidLeave() {
    this.parsedLinks = [];
  }
}
