import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DriverCreatePage } from './driver-create.page';

const routes: Routes = [
  {
    path: '',
    component: DriverCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DriverCreatePageRoutingModule {}
