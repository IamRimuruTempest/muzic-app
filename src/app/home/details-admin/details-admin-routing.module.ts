import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsAdminPage } from './details-admin.page';

const routes: Routes = [
  {
    path: '',
    component: DetailsAdminPage
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailsAdminPageRoutingModule {}
