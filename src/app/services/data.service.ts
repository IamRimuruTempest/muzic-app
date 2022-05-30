import { Timestamp } from 'firebase/firestore';
import { Injectable } from '@angular/core';
import {
  collectionData,
  docData,
  Firestore,
  collection,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
  setDoc,
  query,
  where,
  limit,
  orderBy,
} from '@angular/fire/firestore';
import { Observable , from} from 'rxjs/';
import { Account } from '../models/user';
import { Product } from '../models/product';
import { Cart } from '../models/cart';
import { CartItem } from '../models/cart-item';

import { Category } from '../models/category';




@Injectable({
  providedIn: 'root',
})
export class DataService {


  constructor(
    private firestore: Firestore,
    // private storage: AngularFireStorage,
  ) {}


  

     

  getUser(uid: string): Observable<Account> {
    const accountDocRef = doc(this.firestore, `account/${uid}`);
    return docData(accountDocRef, { idField: 'userId' }) as Observable<Account>;
  }


   getAcount() {
    const accountDocRef = collection(this.firestore, `account`);
    return collectionData(accountDocRef, { idField: 'userId' }) as Observable<Account[]>;
  }

  addAccount(id: string, account: Account) {
    const accountDocRef = doc(this.firestore, `account/${id}`);
    return setDoc(accountDocRef, { ...account });
  }

  updateAccount(account: Account) {
    const accountDocRef = doc(this.firestore, `/account/${account.userId}`);
    const newAccount = Object.assign({}, account);
    delete newAccount.userId;
    delete newAccount.userEmail;
    return updateDoc(accountDocRef, { ...newAccount });
  }

  addCart( cart: Cart) {
    const cartRef = collection(this.firestore, `/account/cart`);
    return addDoc(cartRef, cart);
  }

  addProduct(product: Product) {
    const productRef = collection(this.firestore, `/product`);
    return addDoc(productRef, product);
  }

  deleteNote(product: Product) {
    const productDocRef = doc(this.firestore, `product/${product.productId}`);
    return deleteDoc(productDocRef);
  }


  getProducts() {
    const productRef = collection(this.firestore, 'product');
    return collectionData(productRef, { idField: 'productId'}) as Observable<Product[]>;
  }

  getProductById(productId: string): Observable<Product> {
    const productDocRef = doc(this.firestore, `product/${productId}`);
    return docData(productDocRef, { idField: 'productId' }) as Observable<Product>;
  }

  getProductByIds(productIds: string[]): Observable<Product[]> {
    const productsDocRef = collection(this.firestore, `product`);
    const q = query(productsDocRef, where('productId', 'in', productIds))
    return collectionData(q, { idField: 'productId' }) as Observable<Product[]>;
  }
  

  updateProduct(product: Product) {
    const productDocRef = doc(
      this.firestore,
      `/product/${product.productId}`
    );
    return updateDoc(productDocRef, {...product});
  }


  //CART
  // addToCart(uid: string, productId: string) {
  //   const cartRef = doc(
  //     this.firestore,
  //     `account/${uid}/cart/${productId}`
  //   );
  //   return addDoc(cartRef, {productId});
  // }

  //  addToCart(uid: string, product: Product) {
  //   const cartRef = collection(
  //     this.firestore,
  //     `account/${uid}/cart`
  //   );
  //   return addDoc(cartRef, product);
  // }

  deleteCart(uid: string, cartItem: CartItem) {
   const cartDocRef = doc(
      this.firestore,
      `account/${uid}/carts/${cartItem.productId}`
    )
    return deleteDoc(cartDocRef);
  }



  addToCart(uid: string, cartItem: CartItem ) {
    const cartRef = doc( 
      this.firestore,
      `account/${uid}/carts/${cartItem.productId}`
    )
    const item = Object.assign({}, cartItem);
    delete item.id;
    return setDoc(cartRef, item)
  }

  // deleteCart(uid: string, cartItem: CartItem) {
  //   const cartRef = doc(
  //     this.firestore,
  //     `account/${uid}/carts/${cartItem.productId}`
  //   )

  //   const item = Object.assign({}, cartItem);
  //   // delete item.id;
  //   return deleteDoc(cartRef, item);
  // }


  addToOrder(uid: string, cartItem: CartItem ) {
    const cartRef = doc(
      this.firestore,
      `account/${uid}/orders/${cartItem.productId}`
    )
    const item = Object.assign({}, cartItem);
    delete item.id;
    return setDoc(cartRef, item)
  }

  getCart(uid: string) {
    const cartRef = collection(
      this.firestore,
      `account/${uid}/carts`
    );
    return collectionData(cartRef, {idField: 'productId'}) as Observable<CartItem []>;
  }

  getOrder(uid: string) {
    const cartRef = collection(
      this.firestore,
      `account/${uid}/orders`
    );
    return collectionData(cartRef, {idField: 'productId'}) as Observable<CartItem []>;
  }

  // getAllCart(uid: string, cartItem: CartItem) {
  //     const cartRef = collection(
  //       this.firestore,
  //       `account/${uid}/carts/${cartItem.id}`
  //     );
  //     return collectionData(cartRef, {idField: 'id'}) as Observable<CartItem []>;
  // }

  //CATEGORY
  addCategory(category: Category) {
    const categoryRef = collection(this.firestore, `/category`);
    return addDoc(categoryRef, category);
  }

   getCategory() {
    const categoryRef = collection(this.firestore, 'category');
    return collectionData(categoryRef, { idField: 'categoryId' }) as Observable<Category  []>;
  }

  getCategoryById(categoryId: string): Observable<Category> {
    const categoryRef = doc(this.firestore, `category/${categoryId}`);
    return docData(categoryRef, { idField: 'categoryId' }) as Observable<Category>;
  }

   deleteCategory(category: Category) {
    const categoryRef = doc(this.firestore, `category/${category.categoryId}`);
    return deleteDoc(categoryRef);
  }




  //Adding and Update Images in Firebase Storage

  updateOwnProfile(uid: string, account: Account) {
    const accountDocRef = doc(this.firestore, `account/${uid}`);
    return updateDoc(accountDocRef, { ...account });
  }

  updateProductImg(productId: string, product: Product) {
    const productDocRef = doc(this.firestore, `product/${productId}`);
    return updateDoc(productDocRef, { ...product });
  }










}
