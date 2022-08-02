import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DriverInOutPage } from './driver-in-out.page';

const routes: Routes = [
  {
    path: '',
    component: DriverInOutPage
  },
  {
    path: 'new-driver-in-out',
    loadChildren: () => import('./new-driver-in-out/new-driver-in-out.module').then( m => m.NewDriverInOutPageModule)
  },
  {
    path: 'create',
    loadChildren: () => import('./new-driver-in-out/new-driver-in-out.module').then( m => m.NewDriverInOutPageModule)
  },
  {
    path: ':driverInOutId/edit',
    loadChildren: () => import('./new-driver-in-out/new-driver-in-out.module').then( m => m.NewDriverInOutPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DriverInOutPageRoutingModule {}
