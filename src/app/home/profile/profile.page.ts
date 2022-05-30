import { DataService } from 'src/app/services/data.service';
/* eslint-disable @typescript-eslint/naming-convention */
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/models/user';
import {
  ModalController,
  PopoverController,
  ToastController,
  AlertController,
  LoadingController
} from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthErrorCodes } from '@firebase/auth';
import { first } from 'rxjs/operators';

import { 
  getStorage, 
  FirebaseStorage,
  // afsService, 
  // imageUrl, 
  ref,
  } from '@angular/fire/storage';
import { error } from 'console';

import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';

import { FireStorageService } from 'src/app/services/fire-storage.service';

import { faPenSquare } from '@fortawesome/free-solid-svg-icons';

import { Pipe } from '@angular/core';

@Pipe({ 
  name: 'emailAsterisk',
 })


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  fullName: string;
 
  faPenSquare = faPenSquare;


  userId: string;
  defaultVal = {
    userType: '',
    userEmail: '',
    userFirstname: '',
    userLastname: '',
    userAddress: '',
    userPhone: '',
    imageUrl: '',
  };
  account: Account = this.defaultVal;
  accountSubs: Subscription;
  constructor(
    private authService: AuthService,
    private popoverCtrl: PopoverController,
    private router: Router,
    private modalCtrl: ModalController,
    private dataService: DataService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    
    private afsService: FireStorageService ,
  ) {}

  ngOnInit() {
    this.accountSubs = this.authService.userAccount.subscribe((acc) => {
      this.account = acc;
      console.log("Hello", this.account)
    });

  }

  transform(value: string): string {
    return value 
      ? value.replace(/\B.+@/g, (c, ) => c.split('').slice(0, -1).map(v => '*').join('') + '@') 
      : value;
  }


  

  


 
  ionViewWillEnter() {}

  ionViewWillLeave() {}
  logout() {
    // this.accountSubs.unsubscribe();
    this.popoverCtrl.dismiss();
    this.authService.signOut();
    this.account = this.defaultVal;
  }

  async tryChangePassword(passwords) {
    if (passwords.newPassword !== passwords.confirmPassword) {
      this.showToast('New password mismatch');
      return;
    }
    // reauthenticate user
    console.log('Re-authenticating user...');
    this.authService
      .reauthenticate(this.authService.user.email, passwords.oldPassword)
      .then(
        (res) => {
          console.log('User Authenticated, password is correct...');
          console.log(res);
          this.authService.changePassword(passwords.newPassword).then(() => {
            this.showToast('Password Updated');
            this.dismissModal();
          });
        },
        (err) => {
          if (err.code === AuthErrorCodes.INVALID_PASSWORD) {
            this.showToast('Incorrect Password');
          }
        }
      ); 
  } 

  updateProfile(value) {
    console.log(value);
    this.dataService.updateAccount(value).then(
      () => {
        // success
        this.showToast('Update success!');
        this.dismissModal();
      },
      (err) => {
        // error
        this.showToast(err.message);
      }
    );
  }
  async showToast(message) {
    const toast = await this.toastCtrl.create({
      header: message,
      duration: 2000,
      position: 'top',
    });
    toast.present();
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }


   async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Are you sure?',
      message: '<p>You will need to login again to keep using the applications</p>',
      buttons: [
        {
          text: 'CANCEL',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: () => {
            console.log('Cancel Logout');
          }
        }, {
          text: 'LOG OUT',
          id: 'confirm-button',
          handler: () => {
            console.log('Confirm Logout');
            this.logout()
          }
        }
      ]
    });

    await alert.present();
  }



  async addUpdateStoreImage() {
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
        .uploadStringProfileImage(
          this.authService.user.uid,
          // this.userId,
          image.base64String
        )
        .then(() => {
          loading.dismiss();
          // get the download url from firebase storage
          this.afsService
            .getProfileImageDownloadUrl(this.authService.user.uid)
            .then((url) => {
              // update the store and put the image URL
              this.dataService
                .updateOwnProfile(this.authService.user.uid, {
                  ...this.account,
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
