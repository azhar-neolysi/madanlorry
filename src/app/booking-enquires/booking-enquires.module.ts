import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookingEnquiresPageRoutingModule } from './booking-enquires-routing.module';

import { BookingEnquiresPage } from './booking-enquires.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    IonicModule,
    BookingEnquiresPageRoutingModule
  ],
  declarations: [BookingEnquiresPage]
})
export class BookingEnquiresPageModule {}
