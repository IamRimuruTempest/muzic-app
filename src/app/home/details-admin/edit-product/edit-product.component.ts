import { Component,   Input, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Product } from 'src/app/models/product';
import {ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  @Output() dismissed = new EventEmitter();
  @Output() submitData = new EventEmitter();

  selectedProduct: Product;
  @Input() set product(value) {
    if(value) {
      this.selectedProduct = Object.assign({}, value);
    }
  }

  constructor(
    private dataService: DataService,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
   
  }

  // async updateProduct() {
  //   await this.dataService.updateProduct(this.selectedProduct);
  //   const toast = await this.toastCtrl.create({
  //     message: 'Note updated!.',
  //     duration: 2000
  //   });
  //   toast.present();
 
  // }

    updateProduct(value) {
    this.dataService.updateProduct(this.selectedProduct)
    .then(
      () => {
        // success
        this.showSuccessToast();
        this.dismissModal();
      },
      (err) => {
        // error
        this.showErrorToast(err);
      }
    );
  }
    async showSuccessToast() {
    const toast = await this.toastCtrl.create({
      header: 'Update success',
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }
  async showErrorToast(err) {
    const toast = await this.toastCtrl.create({
      header: err.message,
      duration: 2000,
    });
    toast.present();
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }

}
