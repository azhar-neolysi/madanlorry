
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { LoaderService } from 'src/app/services/Loader/loader.service';
import { MyBookingService } from '../services/my-booking/my-booking.service';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.page.html',
  styleUrls: ['./my-bookings.page.scss'],
})
export class MyBookingsPage implements OnInit {

  myBookings: any = [];
  transpoterId: number;
  constructor(private bookingApi: MyBookingService,
    private ls: LocalStorageService,
    private router: Router,
    private loader: LoaderService) { }

  ngOnInit() { }
  ionViewWillEnter() {
    this.transpoterId = Number(this.ls.getCustomerId());
    this.getMyBookings(this.transpoterId, '');
  }
  getMyBookings(transpoterId, bookingId) {
    this.loader.createLoader();
    this.bookingApi.getMyBookings(transpoterId, bookingId).subscribe(success => {
      this.loader.dismissLoader();
      console.log('success', success);
      this.formDataToShow(success);

    },
      failure => {
        this.loader.dismissLoader();
        console.log('failure', failure);
      });
  }
  formDataToShow(data) {
    const length = data.bookingDtls.length;
    const info = [];
    for (let i = 0; i < length; i++) {
      const details = {
        bookingId: data.bookingDtls[i]?data.bookingDtls[i].bookingId:'-',
        location: data.polbmDtls[i]?data.polbmDtls[i].location:'-',
        podLocation: data.podbmDtls[i]?data.podbmDtls[i].podLocation:'-',
        material: data.bookingDtls[i]?data.bookingDtls[i].material:'-',
        totalQty: data.bookingDtls[i]?data.bookingDtls[i].totalQty:'-',
        vvberVehicleNo: data.vberDtls.length > 0 ? data.vberDtls[i].vvberVehicleNo : '-',
        driverName: data.dioDtls[i]?data.dioDtls[i].driverName:'-'
      };
      info.push(details);
    }
    this.myBookings = info;
  }
  getBooking(bookingid) {
    this.router.navigate(['my-bookings', 'booking', bookingid]);
  }
}
