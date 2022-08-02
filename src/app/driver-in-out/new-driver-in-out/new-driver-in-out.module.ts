import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewDriverInOutPageRoutingModule } from './new-driver-in-out-routing.module';

import { NewDriverInOutPage } from './new-driver-in-out.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    IonicModule,
    NewDriverInOutPageRoutingModule
  ],
  declarations: [NewDriverInOutPage]
})
export class NewDriverInOutPageModule {}
