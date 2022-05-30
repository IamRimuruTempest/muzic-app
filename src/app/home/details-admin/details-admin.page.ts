import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController, LoadingController, ToastController } from '@ionic/angular';
import { EditProductComponent } from 'src/app/home/details-admin/edit-product/edit-product.component';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { FireStorageService } from 'src/app/services/fire-storage.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-details-admin',
  templateUrl: './details-admin.page.html',
  styleUrls: ['./details-admin.page.scss'],
})
export class DetailsAdminPage implements OnInit {

  productId: string;
  product: Product = {
    productName: '',
    productCategory: '',
    productColor	: '',
    productDescription: '',
    productPrice: 0,
    imageUrl: ''
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private router: Router,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private afsService: FireStorageService ,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.productId = this.activatedRoute.snapshot.params.productId;
    console.log("Product ID:", this.productId);
    this.dataService.getProductById(this.productId).subscribe(product => {
      console.log(product);
      this.product = product as Product;
    });
  }

  updateProduct(value) {
    this.dataService.updateProduct(value);
    // .then(
    //   () => {
    //     // success
    //     this.showSuccessToast();
    //     this.dismissModal();
    //   },
    //   (err) => {
    //     // error
    //     this.showErrorToast(err);
    //   }
    // );
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }

  // async editModal(product: Product) {
  //   const modal = await this.modalCtrl.create({
  //     component: EditProductComponent,
  //     componentProps: {
  //        productId: product.productId },
  //     breakpoints: [0, 0.5, 0.8],
  //     initialBreakpoint: 0.8
  //   });
 
  //   await modal.present();
  // }


   async deleteNote() {
    await this.dataService.deleteNote(this.product);
    this.router.navigate(['..admin/product-admin']);
  }


  async addUpdateProductImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Base64,
      source: CameraSource.Prompt,
    });
 
    if (image) {
      console.log('starting upload');
      const loading = await this.loadingCtrl.create({
        message: 'Uploading image',
      });
 
      loading.present();
      this.afsService
        .uploadStringProductImage(
          this.productId,
          // this.userId,
          image.base64String
        )
        .then(() => {
          loading.dismiss();
          // get the download url from firebase storage
          this.afsService
            .getProductDownloadUrl(this.product.productId)
            .then((url) => {
              // update the store and put the image URL
              this.dataService
                .updateProductImg(this.product.productId, {
                  ...this.product,
                  imageUrl: url,
                })  
                .then(() =>
                  this.toastCtrl.create({
                    message: 'Image has been uploaded!',
                    duration: 3000,
                    position: 'top'
                  })
                );
            });
        })
        .catch((err) => {
          console.log(err);
          this.toastCtrl.create({
            message: 'Error while uploading image.',
            duration: 3000,
            position: 'top'
          })
        });
    }
  }

}
