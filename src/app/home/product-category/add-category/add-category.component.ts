import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Category } from 'src/app/models/category';
import { AuthService } from 'src/app/services/auth.service';
import { ModalController, ToastController, LoadingController, AlertController} from '@ionic/angular';

import { 
  getStorage, 
  FirebaseStorage,
  ref,
  } from '@angular/fire/storage';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent implements OnInit {

  defaultVal = {
    categoryName : '',
  };
  category: Category = this.defaultVal;

  storage: FirebaseStorage;

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
  ) { }

  ngOnInit() {}

    submitCategory() {
    this.dataService.addCategory(this.category).then((res) => {
      this.category = this.defaultVal;
      this.autoLoader();
      this.dismiss();
    });
  }


 autoLoader() {
    this.loadingCtrl.create({
      message: 'Loader hides after 4 seconds',
      duration: 4000
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
