import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Product } from 'src/app/models/product';
import { Cart } from'src/app/models/cart';
import { DataService } from 'src/app/services/data.service';
import { AuthService } from 'src/app/services/auth.service';
import {
  ModalController,
  PopoverController,
  ToastController,
  AlertController
} from '@ionic/angular';
import { error } from 'console';


@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  
  productId: string;
  product: Product = {
    productName: '',
    productCategory: '',
    productColor	: '',
    productDescription: '',
    productPrice: 0
  }


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private authService: AuthService,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.productId = this.activatedRoute.snapshot.params.productId;
    console.log("Product ID:", this.productId);
    this.dataService.getProductById(this.productId).subscribe(product => {
      console.log(product);
      this.product = product as Product;
    });
  }


  
   goToProduct(){
    this.router.navigate(['/home/product']);
    console.log("Click")
  }
  

 




 

}
