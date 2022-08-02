import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VehicleCreatePage } from './vehicle-create.page';

const routes: Routes = [
  {
    path: '',
    component: VehicleCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehicleCreatePageRoutingModule {}
