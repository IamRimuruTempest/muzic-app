

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [

      {
    path: 'hero',
    loadChildren: () => import('./hero/hero.module').then( m => m.HeroPageModule)
  },
      // {
      //   path: 'home-page',
      //   children: [
      //     {
      //       path: '',
      //       loadChildren: () =>
      //         import('./home-page/home-page.module').then(
      //           (m) => m.HomePagePageModule
      //         ),
      //     },
      //   ],
      // },

      // {
      //   path: 'product',
      //   children: [
      //     {
      //       path: '',
      //       loadChildren: () =>
      //         import('./product/product.module').then(
      //           (m) => m.ProductPageModule
      //         ),
      //     },
      //   ],
      // },

      //  {
      //   path: 'home-page',
      //   loadChildren: () => 
      //     import('./home-page/home-page.module').then( m => m.HomePagePageModule)
      // }, 
      {
        path: 'hero',
        loadChildren: () => 
          import('./hero/hero.module').then( m => m.HeroPageModule)
      }, 

       {
        path: 'product',
        loadChildren: () => 
          import('./product/product.module').then( m => m.ProductPageModule)
      }, 
     

      {
        path: 'cart',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./cart/cart.module').then(
                (m) => m.CartPageModule
              ),
          },
        ],
      },

      {
        path: 'order',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./order/order.module').then(
                (m) => m.OrderPageModule
              ),
          },
        ],
      },

       {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./profile/profile.module').then(
                (m) => m.ProfilePageModule
              ),
          },
        ],

      },


      {
        path: 'dashboard',
        loadChildren: () => 
          import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
      }, 
     
       {
        path: 'users',
        loadChildren: () => 
          import('./users/users.module').then( m => m.UsersPageModule)
      },
      {
        path: 'product-admin',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./admin/product-admin/product-admin.module').then(
                (m) => m.ProductAdminPageModule
              ),
          },
        ],
      },

      {
        path: 'profile-admin',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./profile-admin/profile-admin.module').then(
                (m) => m.ProfileAdminPageModule
              ),
          },
        ],
      },

      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  {
    path: 'details/:productId',
    loadChildren: () => import('./details/details.module').then( m => m.DetailsPageModule)
  },
  {
    path: 'details-admin/:productId',
    loadChildren: () => import('./details-admin/details-admin.module').then( m => m.DetailsAdminPageModule)
  },
  {
    path: 'user-details/:userId',
    loadChildren: () => import('./user-details/user-details.module').then( m => m.UserDetailsPageModule)
  },
  {
    path: 'product-category',
    loadChildren: () => import('./product-category/product-category.module').then( m => m.ProductCategoryPageModule)
  },
  {
    path: 'add-admin',
    loadChildren: () => import('./profile-folder/add-admin/add-admin.module').then( m => m.AddAdminPageModule)
  },
  
  
 
  


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}



