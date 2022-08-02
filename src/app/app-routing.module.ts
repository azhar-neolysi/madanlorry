import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'booking-enquires',
    loadChildren: () => import('./booking-enquires/booking-enquires.module').then( m => m.BookingEnquiresPageModule)
  },
  {
    path: 'my-bookings',
    loadChildren: () => import('./my-bookings/my-bookings.module').then( m => m.MyBookingsPageModule)
  },
  {
    path: 'manage-vehicle',
    loadChildren: () => import('./manage-vehicle/manage-vehicle.module').then( m => m.ManageVehiclePageModule)
  },
  {
    path: 'manage-driver',
    loadChildren: () => import('./manage-driver/manage-driver.module').then( m => m.ManageDriverPageModule)
  },
  {
    path: 'driver-in-out',
    loadChildren: () => import('./driver-in-out/driver-in-out.module').then( m => m.DriverInOutPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'track',
    loadChildren: () => import('./track/track.module').then( m => m.TrackPageModule)
  },
  {
    path: 'my-profile',
    loadChildren: () => import('./my-profile/my-profile.module').then( m => m.MyProfilePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
