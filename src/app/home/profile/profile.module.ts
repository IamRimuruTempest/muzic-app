import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';

import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({ 
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    FontAwesomeModule
  ],
  declarations: [
    ProfilePage,
    EditProfileComponent,
    ChangePasswordComponent,
  ]
})
export class ProfilePageModule {}
