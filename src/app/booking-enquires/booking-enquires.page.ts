import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { LoaderService } from 'src/app/services/Loader/loader.service';
import { BookingEnquiresService } from '../services/booking-enquires/booking-enquires.service';

export interface BookingReqs {
  bookingId: number;
  location: string;
  podLocation: string;
  material: string;
  totalQty: number;
  vehicleType: string;
  estimatedLoadingTime: Date;
  vehicleBookingEnqResponseId: number;
}

@Component({
  selector: 'app-booking-enquires',
  templateUrl: './booking-enquires.page.html',
  styleUrls: ['./booking-enquires.page.scss'],
})
export class BookingEnquiresPage implements OnInit {
  bookingEnquires = [];
  responseJson = {
    vehicleBookingEnqResponseId: 0,
    feedBack: '',
    refModifiedBy: 0,
  };
  transpoterId = 0;
  constructor(
    private benqApi: BookingEnquiresService,
    private ls: LocalStorageService,
    public alertController: AlertController,
    private loader: LoaderService
  ) {}

  ngOnInit() {}
  ionViewWillEnter() {
    this.transpoterId = Number(this.ls.getCustomerId());
    console.log(this.transpoterId);
    this.getEnqData(this.transpoterId);
    this.responseJson.refModifiedBy = this.transpoterId;
  }
  getEnqData(ownerId) {
    this.loader.createLoader();
    this.benqApi.getAllBookingEnq(ownerId).subscribe(
      (success: any) => {
        this.loader.dismissLoader();
        console.log('success', success);
        this.formEnquiryData(success);
        // this.bookingEnquires = success.bookingDtls;
      },
      (failure) => {
        this.loader.dismissLoader();
        console.log('failure', failure);
      }
    );
  }
  formEnquiryData(data) {
    console.log(data);

    for (let i = 0; i < data.bookingDtls.length; i++) {
      console.log(data.bookingDtls[i]);
      const bookingDetails: BookingReqs = {
        bookingId: data.bookingDtls[i].bookingId,
        vehicleType: data.bookingDtls[i].vehicleType,
        location: data.polbmDtls[i].location,
        podLocation: data.podbmDtls[i].podLocation,
        material: data.bookingDtls[i].material,
        totalQty: data.bookingDtls[i].totalQty,
        estimatedLoadingTime: data.polbmDtls[i].estimatedLoadingTime,
        vehicleBookingEnqResponseId:
          data.vberDtls[i].vehicleBookingEnqResponseId,
      };
      this.bookingEnquires.push(bookingDetails);
    }
  }
  async presentAlertPrompt(enquireRosponseId) {
    this.responseJson.vehicleBookingEnqResponseId = enquireRosponseId;
    console.log('---', enquireRosponseId);

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      animated: true,
      // backdrop-dismiss:true,
      header: 'Confirmation ',
      message: 'Feedback :',
      inputs: [
        {
          name: 'Feedback',
          type: 'text',
          placeholder: 'Ready to accept',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (alertData) => {},
        },
        {
          text: 'Ok',
          handler: (alertData) => {
            this.accepted(alertData.Feedback);
          },
        },
      ],
    });

    await alert.present();
  }
  accepted(feedback) {
    this.loader.createLoader();
    // this.responseJson.VehicleBookingEnqResponseId = enquireRosponseId;
    this.responseJson.feedBack = 'Accepted ' + feedback;
    console.log('this.responseJson', this.responseJson);

    this.benqApi.submitResponse(this.responseJson).subscribe(
      (success) => {
        this.loader.dismissLoader();
        console.log('success', success);
        this.ionViewWillEnter();
      },
      (failure) => {
        this.loader.dismissLoader();
        console.log('failure', failure);
      }
    );
    this.ionViewWillEnter();
  }
  reject(enquireRosponseId) {
    this.loader.createLoader();
    this.responseJson.vehicleBookingEnqResponseId = enquireRosponseId;
    this.responseJson.feedBack = 'Rejected';
    this.benqApi.submitResponse(this.responseJson).subscribe(
      (success) => {
        this.loader.dismissLoader();
        console.log('success', success);
        this.ionViewWillEnter();
      },
      (failure) => {
        this.loader.dismissLoader();
        console.log('failure', failure);
      }
    );
    this.ionViewWillEnter();
  }
}
