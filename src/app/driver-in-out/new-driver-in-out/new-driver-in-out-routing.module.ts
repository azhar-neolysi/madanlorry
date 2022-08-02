import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewDriverInOutPage } from './new-driver-in-out.page';

const routes: Routes = [
  {
    path: '',
    component: NewDriverInOutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewDriverInOutPageRoutingModule {}
