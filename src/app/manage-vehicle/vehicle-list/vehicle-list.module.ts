import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VehicleListPageRoutingModule } from './vehicle-list-routing.module';

import { VehicleListPage } from './vehicle-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    IonicModule,
    VehicleListPageRoutingModule
  ],
  declarations: [VehicleListPage]
})
export class VehicleListPageModule {}
