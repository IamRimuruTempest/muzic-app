import { Injectable } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import {
  ref,
  getStorage,
  FirebaseStorage,    
  uploadBytes,
  getDownloadURL,
  getBlob,
  uploadString
} from '@angular/fire/storage';

const storage1 = getStorage();

@Injectable({
  providedIn: 'root'
})
export class FireStorageService {
  
  storage: FirebaseStorage;

  constructor( ) { 
     this.storage = getStorage(); 
  }

  
  uploadStringProfileImage(
    userId: string,
    base64String: string
  ) {
    const storeImageRef = ref(
      this.storage,
      `account/${userId}/profile`
    );
    const metadata = {
      contentType: 'image/jpeg',
    };
    //
    return uploadString(storeImageRef, base64String, 'base64', metadata);
  }


  getProfileImageDownloadUrl( userId: string) {
    const storeImageRef = ref(
      this.storage,
      `account/${userId}/profile`
    );
    return getDownloadURL(storeImageRef);
  }



  //PRODUCTS
  uploadStringProductImage(
    productId: string,
    base64String: string
  ) {
    const storeImageRef = ref(
      this.storage,
      `product/${productId}`
    );
    const metadata = {
      contentType: 'image/jpeg',
    };
    //
    return uploadString(storeImageRef, base64String, 'base64', metadata);
  }


   getProductDownloadUrl( productId: string) {
    const productImageRef = ref(
      this.storage,
      `product/${productId}`
    );
    return getDownloadURL(productImageRef);
  }


 
}
