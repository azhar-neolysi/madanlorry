import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookingEnquiresPage } from './booking-enquires.page';

const routes: Routes = [
  {
    path: '',
    component: BookingEnquiresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingEnquiresPageRoutingModule {}
