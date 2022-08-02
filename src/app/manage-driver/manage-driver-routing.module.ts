import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageDriverPage } from './manage-driver.page';

const routes: Routes = [
  // {
  //   path: '',
  //   component: ManageDriverPage
  // },
  {
    path: '',
    loadChildren: () => import('./driver-list/driver-list.module').then( m => m.DriverListPageModule)
  },
  {
    path: 'driver-list',
    loadChildren: () => import('./driver-list/driver-list.module').then( m => m.DriverListPageModule)
  },
  {
    path: 'create',
    loadChildren: () => import('./driver-create/driver-create.module').then( m => m.DriverCreatePageModule)
  },
  {
    path: 'edit/:driverId/:userId',
    loadChildren: () => import('./driver-create/driver-create.module').then( m => m.DriverCreatePageModule)
  },
  {
    path: 'driver-create',
    loadChildren: () => import('./driver-create/driver-create.module').then( m => m.DriverCreatePageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageDriverPageRoutingModule {}
