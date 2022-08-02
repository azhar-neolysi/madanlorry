import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DriverListPage } from './driver-list.page';

const routes: Routes = [
  {
    path: '',
    component: DriverListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DriverListPageRoutingModule {}
