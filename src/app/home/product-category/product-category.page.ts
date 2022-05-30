import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { Product } from 'src/app/models/product';
import { Category } from 'src/app/models/category';

import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.page.html',
  styleUrls: ['./product-category.page.scss'],
})
export class ProductCategoryPage implements OnInit {
  // category: Array<Category> = [];
  subscription: Subscription;

  categoryId: string;

   categories: Category = {
    categoryName: ''
  }

  constructor(
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.dataService.getCategoryById(this.categoryId).subscribe(category => {
      console.log(category);
      this.categories = this.categories as Category;
    });
  }

  ionViewDidEnter() {
    this.subscription = this.dataService.getCategory()
      .subscribe(
        (res) => {
          this.categories  = this.categories as Category;
        }
      );
  }

   async deleteCategory() {
    await this.dataService.deleteCategory(this.categories);
  }

}
