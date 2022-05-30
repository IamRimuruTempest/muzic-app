import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { User_Type } from './../../enums/account-type.enum';
import { first } from 'rxjs/operators';
import { AuthErrorCodes } from '@firebase/auth';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  validationForm_Group: FormGroup;
  error: string = null;
  pwdIcon = "eye-outline";
  showPwd = false;


  constructor(
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private router: Router
    ) { }


  togglePwd() {
    this.showPwd = !this.showPwd;
    this.pwdIcon = this.showPwd ? "eye-off-outline" : "eye-outline";
  }

  ionViewWillEnter() {
    console.log(this.authService.isLoggedIn);
    if (this.authService.isLoggedIn) {
      this.authService.userAccount.pipe(first()).subscribe((res) => {
        console.log('User is :', res.userType);

        if (res.userType === User_Type.USER) {
          this.router.navigate(['/home/hero']);
        } else if (res.userType === User_Type.ADMIN) {
          this.router.navigate(['/home/dashboard']);
        }
      });
    }
  }
  
  ngOnInit() {

    this.validationForm_Group = this.formBuilder.group({
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(
            // eslint-disable-next-line max-len
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ),
        ])
      ),
      password: new FormControl('', Validators.compose([Validators.required])),
    });
  }

  // validationMessages = {
  //   email: [
  //     { type: 'required', message: 'Email is required.' },
  //     { type: 'pattern', message: 'Please enter a valid email.' },
  //   ],
  //   password: [{ type: 'required', message: 'Password is required.' }],
  // };


  onSubmit(value) {
    console.log('Trying to login');
    this.error = null;
    if (!this.validationForm_Group.valid) {
      this.toastCtrl
        .create({
          header: 'Form invalid',
          duration: 3000,
        })
        .then((res) => {
          res.present();
        });
      console.log('Form invalid');
      return;
    }
    console.log(value);
    this.authService
      .login(value.email, value.password)
      .then(
        (response) => {
          this.validationForm_Group.reset();
          setTimeout(() => {
            this.authService.fetchLoggedInUser();
          }, 3000);

          this.authService.userAccount.pipe(first()).subscribe((res) => {
            console.log('User is :', res.userType);
            if (res.userType === User_Type.USER) {
              this.router.navigate(['/home/hero']);
            } else if (res.userType === User_Type.ADMIN) {
              this.router.navigate(['/home/dashboard']);
            }
          });
        },
        (err) => {
          console.log('Err block', err.code, err.message);
          if (
            err.code === AuthErrorCodes.INVALID_PASSWORD ||
            err.code === AuthErrorCodes.USER_DELETED
          ) {
            this.error = 'Incorrect email or password';
          }
        }
      )
      .catch((err) => console.log('Catch block:', err));
  }

 goToRegister(){
    this.router.navigate(['register'])
  }
  

}
