import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';
import { ModalController, ToastController, LoadingController, AlertController} from '@ionic/angular';
import { FireStorageService } from 'src/app/services/fire-storage.service';

import { 
  getStorage, 
  FirebaseStorage,
  // afsService, 
  // imageUrl, 
  ref,
  } from '@angular/fire/storage';
import { error } from 'console';


//IMPORTING CAMERA FOR IMG
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
// import { PhotoViewer } from '@awesome-cordova-plugins/photo-viewer/ngx';
//  

// import { ImagePicker } from '@ionic-native/image-picker/ngx';
// import { normalizeURL } from 'ionic-angular';




@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {


  // @Input() productId: string;
  productId: string;
  defaultVal = {
    productName : '',
    productPrice : 0,
    productCategory: '',
    productColor : '',
    productDescription : '',
    imageUrl: ''
  };
  product: Product = this.defaultVal;

  // storage: FirebaseStorage;



 
  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController, 

    // private photoViewer: PhotoViewer,
   
    private afsService: FireStorageService ,

    // private imagePicker: ImagePicker
  ) {
    
   }

  ngOnInit() {
    // this.dataService.getProductById(this.productId).subscribe(res =>{
    //   this.product = res;
    // })
  }

  submitProduct() {
    this.dataService.addProduct(this.product).then((res) => {

      this.dataService.updateProduct({...this.product, productId: res.id});
      this.product = this.defaultVal;
      this.autoLoader();
      this.dismiss();
    });
  }


 autoLoader() {
    this.loadingCtrl.create({
      message: 'Loading',
      duration: 2000
    }).then((response) => {
      response.present();
      response.onDidDismiss().then((response) => {
        console.log('Loader dismissed', response);
      });
    });
  }   
  dismiss() {
    this.modalCtrl.dismiss();
  }





  
 



}
