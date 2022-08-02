import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DriverCreatePageRoutingModule } from './driver-create-routing.module';

import { DriverCreatePage } from './driver-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    IonicModule,
    DriverCreatePageRoutingModule
  ],
  declarations: [DriverCreatePage]
})
export class DriverCreatePageModule {}
