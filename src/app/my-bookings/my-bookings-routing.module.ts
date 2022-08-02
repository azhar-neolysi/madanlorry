import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyBookingsPage } from './my-bookings.page';

const routes: Routes = [
  {
    path: '',
    component: MyBookingsPage
  },
  {
    path: 'booking/:bookingId',
    loadChildren: () => import('./booking/booking.module').then( m => m.BookingPageModule)
  },
  {
    path: 'booking',
    loadChildren: () => import('./booking/booking.module').then( m => m.BookingPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyBookingsPageRoutingModule {}
