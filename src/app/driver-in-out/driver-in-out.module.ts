import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DriverInOutPageRoutingModule } from './driver-in-out-routing.module';

import { DriverInOutPage } from './driver-in-out.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    IonicModule,
    DriverInOutPageRoutingModule
  ],
  declarations: [DriverInOutPage]
})
export class DriverInOutPageModule {}
