import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { AuthService } from 'src/app/services/auth.service';
import { PasswordValidator } from '../validators/password.validators';

import { DataService } from 'src/app/services/data.service';
import { Account } from 'src/app/models/user';
import { AuthErrorCodes } from 'firebase/auth';
import { ToastController } from '@ionic/angular';
 
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public validationsFormGroup: FormGroup;
  // matching_passwords_group: FormGroup;
  error: string;
  // accountType  = "User";
  pwdIcon = "eye-outline";
  showPwd = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private dataService: DataService,
    private router: Router,
    private toastCtrl: ToastController
    ) { 
    
  }

  togglePwd() {
    this.showPwd = !this.showPwd;
    this.pwdIcon = this.showPwd ? "eye-off-outline" : "eye-outline";
  }

  goToLogin(){
    this.router.navigate(['login'])
  }

  

  ngOnInit() {
    
   

    this.validationsFormGroup = this.formBuilder.group({
      // FIRST NAME
      firstName: new FormControl (
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(
            /[A-Za-z_.-]/
          )
        ])
      ),
      // LAST NAME
      lastName: new FormControl (
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(
            /[A-Za-z_.-]/
          )
        ])
      ),
      // ADDRESS
      address: new FormControl('', Validators.required),
      //  MOBILE NUMBER
      phone: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[0-9]*$/),
          Validators.minLength(11),
          Validators.maxLength(11),
        ])
      ),
      // EMAIL
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
      password: new FormControl(
          '',
          Validators.compose([
            Validators.minLength(8),
            Validators.required,
            Validators.pattern(
              // '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'
              // '^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$'
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$/
            ),
          ])
        ),
      terms: new FormControl(true, Validators.pattern('true')),
    });
    

  }

  validationMessages = {
    firstName: [
      {
        type: 'pattern',
        message: 'Numbers is not accepted',
      },
    ],
    lastName: [
      {
        type: 'pattern',
        message: 'Numbers is not accepted',
      },
    ],
    phone: [
      { type: 'pattern', message: 'Please enter a valid phone.' },
      { type: 'minlength', message: 'Phone number must be 11 digit long.' },
      { type: 'maxlength', message: 'Phone number must be 11 digit long.' },
    ],

    password: [
      {
        type: 'minlength',
        message: 'Minimum of 8 characters',
      },
      {
        type: 'pattern',
        message:
          'Uppercase, lowercase letter, and one number',
      },
    ],
    terms: [
      { type: 'pattern', message: 'You must accept terms and conditions.' },
    ],
  };
 
  onSubmit(values) {
    console.log(values);
    this.error = '';
    this.authService
      .register(values.email, values.password)
      // values.matching_passwords.password
      .then(
        (res) => {
          // success

          const account: Account = {
            userFirstname: values.firstName,
            userLastname: values.lastName,
            userAddress: values.address,
            userPhone: values.phone,
            userEmail: values.email,
            userType: "User",  
            imageUrl: "",
          };
          // Add account to firestore
          this.validationsFormGroup.reset();
          this.dataService.addAccount(res.user.uid, account);
          this.router.navigate(['/login']);
          this.toastCtrl
            .create({ header: 'You are now registered!', duration: 3000 })
            .then((toast) => toast.present());
        },
        (reason) => {
          console.error('Error:', reason);
          if (reason.code === AuthErrorCodes.EMAIL_EXISTS) {
            this.error = 'Email is already in use';
          }
        }
      );
  }

  


  
  


}
