import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileAdminPageRoutingModule } from './profile-admin-routing.module';

import { ProfileAdminPage } from './profile-admin.page';

import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ProfileAdminPageRoutingModule
  ],
  declarations: [
    ProfileAdminPage,
    EditProfileComponent,
    ChangePasswordComponent
    ]
})
export class ProfileAdminPageModule {}
