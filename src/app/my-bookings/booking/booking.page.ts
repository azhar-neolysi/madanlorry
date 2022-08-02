
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { LoaderService } from 'src/app/services/Loader/loader.service';
import { MyBookingService } from 'src/app/services/my-booking/my-booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
})
export class BookingPage implements OnInit {
  bookingId = 0;
  bookingDetails: any = [];
  transpoterId: number;
  showMap = false;
  constructor(private bookingApi: MyBookingService,
    private aroute: ActivatedRoute,
    private ls: LocalStorageService,
    private router: Router,
    private loader: LoaderService) { }

  ngOnInit() { }
  ionViewWillEnter() {
    this.transpoterId = Number(this.ls.getCustomerId());
    this.aroute.params.subscribe(data => {
      this.bookingId = data.bookingId;
    });
    this.getBookingDetails(this.transpoterId, this.bookingId);
  }
  getBookingDetails(transpoterId, bookingId) {
    this.loader.createLoader();
    this.bookingApi.getMyBookings(transpoterId, bookingId).subscribe((success: any) => {
      this.loader.dismissLoader();
      console.log('success', success);
      this.formLodaingData(success);
      // this.bookingDetails = success[0];
    },
      failure => {
        this.loader.dismissLoader();
        console.log('failure', failure);
      });
  }
  formLodaingData(data) {
    const detail = {
      bookingId: data.bookingDtls[0].bookingId,
      location: data.polbmDtls[0].location,
      podLocation: data.podbmDtls[0].podLocation,
      material: data.bookingDtls[0].material,
      totalQty: data.bookingDtls[0].totalQty,
      vehicleType: data.bookingDtls[0].vehicleType,
      vvberVehicleNo: data.vberDtls[0].vvberVehicleNo,
      driverName: data.dioDtls[0].driverName,
      mobileNo: data.dioDtls[0].mobileNo,
      estimatedLoadingTime: data.polbmDtls[0].estimatedLoadingTime,
      vehicleId: data.vberDtls[0].vvberVehicleId,
      // bpPaymentDate: ,
      bpAmount: data.bpDtls.length > 0 ? data.bpDtls[0].bpAmount : '',
      // rlbpppName:,
      // fright
    };
    this.bookingDetails = detail;
  }
  track(vehicleId) {
    console.log(vehicleId);
    this.router.navigate(['track', 'track', vehicleId]);

  }
}
