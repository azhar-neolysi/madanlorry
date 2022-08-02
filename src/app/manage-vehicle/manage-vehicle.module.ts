import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageVehiclePageRoutingModule } from './manage-vehicle-routing.module';

import { ManageVehiclePage } from './manage-vehicle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageVehiclePageRoutingModule
  ],
  declarations: [ManageVehiclePage]
})
export class ManageVehiclePageModule {}
