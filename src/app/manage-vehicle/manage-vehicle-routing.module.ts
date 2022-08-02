import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageVehiclePage } from './manage-vehicle.page';

const routes: Routes = [
  // {
  //   path: '',
  //   component: ManageVehiclePage
  // },
  {
    path: '',
    loadChildren: () => import('./vehicle-list/vehicle-list.module').then( m => m.VehicleListPageModule)
  },
  {
    path: 'vehicle-list',
    loadChildren: () => import('./vehicle-list/vehicle-list.module').then( m => m.VehicleListPageModule)
  },
  {
    path: 'create',
    loadChildren: () => import('./vehicle-create/vehicle-create.module').then( m => m.VehicleCreatePageModule)
  },
  {
    path: 'edit/:vehicleId',
    loadChildren: () => import('./vehicle-create/vehicle-create.module').then( m => m.VehicleCreatePageModule)
  },
  {
    path: 'vehicle-create',
    loadChildren: () => import('./vehicle-create/vehicle-create.module').then( m => m.VehicleCreatePageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageVehiclePageRoutingModule {}
