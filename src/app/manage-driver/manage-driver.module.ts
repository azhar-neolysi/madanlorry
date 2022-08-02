import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageDriverPageRoutingModule } from './manage-driver-routing.module';

import { ManageDriverPage } from './manage-driver.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageDriverPageRoutingModule
  ],
  declarations: [ManageDriverPage]
})
export class ManageDriverPageModule {}
