/* eslint-disable @typescript-eslint/naming-convention */
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  User,
  UserCredential,
  updatePassword,
  authState,
  signOut,
  reauthenticateWithCredential,
  AuthCredential,
  AuthProvider,
  SignInMethod,
  EmailAuthProvider,
} from '@angular/fire/auth';

import { Account } from '../models/user';
import { DataService } from './data.service';
import { BehaviorSubject } from 'rxjs';

const ACCOUNT_KEY = 'ACCOUNT';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: User;
  // user$: NextOrObserver<User>;
  isLoggedIn: boolean;
  userAccount: BehaviorSubject<Account> = new BehaviorSubject<Account>({
    userFirstname: '',
    userLastname: '',
    userAddress: '',
    userPhone: '',
    userEmail: '',
    userType: '',
    imageUrl: '',
  });

  constructor(
    private dataService: DataService,
    private storageService: StorageService,
    private auth: Auth,
    private router: Router
  ) {
    this.isLoggedIn = false;
    this.auth = getAuth();

    // check user session from firebase
    authState(this.auth).subscribe((data) => {
      console.log('Auth State', data);
      this.user = data;
      if (data) {
        // user is logged in
        this.isLoggedIn = true;
        this.fetchLoggedInUser();
      } else {
        this.isLoggedIn = false;

        // remove user info from local storage
        this.storageService.remove(ACCOUNT_KEY);
      }
    });

    this.checkUserSessionFromLocalStorage();
  }

  async checkUserSessionFromLocalStorage() {
    const account = await this.storageService.get(ACCOUNT_KEY);
    if (account != null) {
      this.isLoggedIn = true;
      this.userAccount.next(account as Account);
      console.log('Logged in from storage');
    }
    // console.log('Account from local storage: ', account);
  }

  reauthenticate(email: string, password: string): Promise<UserCredential> {
    return this.login(email, password);
  }
  changePassword(password) {
    return updatePassword(this.user, password);
  }
  fetchLoggedInUser() {
    this.dataService
      .getUser(this.user.uid)
      .pipe(take(1))
      .subscribe((data) => {
        this.userAccount.next(data);
        console.log('Fetched from firestore:', data);
        // save data to local storage
        this.storageService.set(ACCOUNT_KEY, data);
      });
  }

  register(email, password): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login(email, password): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  signOut() {
    signOut(this.auth).then(() => {
      this.isLoggedIn = false;
      this.router.navigate(['/login']);
    });
    // signOut(this.auth);
  }
}
