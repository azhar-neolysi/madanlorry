import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VehicleCreatePageRoutingModule } from './vehicle-create-routing.module';

import { VehicleCreatePage } from './vehicle-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    IonicModule,
    VehicleCreatePageRoutingModule
  ],
  declarations: [VehicleCreatePage]
})
export class VehicleCreatePageModule {}
