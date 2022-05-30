import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { AuthService } from 'src/app/services/auth.service';

import { DataService } from 'src/app/services/data.service';
import { Account } from 'src/app/models/user';
import { AuthErrorCodes } from 'firebase/auth';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.page.html',
  styleUrls: ['./add-admin.page.scss'],
})
export class AddAdminPage implements OnInit {

  public validationsFormGroups: FormGroup;
  // matching_passwords_group: FormGroup;
  error: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private dataService: DataService,
    private router: Router,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.validationsFormGroups = this.formBuilder.group({
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
  };

}
 