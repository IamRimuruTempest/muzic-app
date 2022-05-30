import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { Product } from 'src/app/models/product';


@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  products: Array<Product> = [];
  subscription: Subscription;

  constructor(
    private dataService: DataService,
  ) { }

  ngOnInit() {
    // this.refresh();
  }

  ionViewDidEnter() {
    this.subscription = this.dataService.getProducts()
      .subscribe(
        (res) => {
          this.products = res as Product[];
        }
      );
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

}
