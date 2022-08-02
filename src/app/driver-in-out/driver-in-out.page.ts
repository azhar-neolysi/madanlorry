
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { LoaderService } from 'src/app/services/Loader/loader.service';
import { AlertService } from '../services/alert/alert.service';
import { DriverInOutService } from '../services/driver-in-out/driver-in-out.service';

@Component({
  selector: 'app-driver-in-out',
  templateUrl: './driver-in-out.page.html',
  styleUrls: ['./driver-in-out.page.scss'],
})
export class DriverInOutPage implements OnInit {

  drivers: any = [];
  deleteJson: any = {};
  tranpoterId;
  constructor(private route: Router,
    private inOutApi: DriverInOutService,
    private ls: LocalStorageService,
    private toast: ToastService,
    private alert: AlertService,
    private loader: LoaderService) { }

  ngOnInit() { }

  newDriverInOut() {
    this.route.navigate(['driver-in-out', 'create']);
  }
  ionViewWillEnter() {
    this.tranpoterId = Number(this.ls.getCustomerId());
    this.getDriverInOut(this.tranpoterId);
  }
  getDriverInOut(transpoterId) {
    this.loader.createLoader();
    this.inOutApi.getdriverInOut(transpoterId).subscribe(success => {
      console.log('success', success);
      this.drivers = success;
      this.loader.dismissLoader();
    },
      failure => {
        this.loader.dismissLoader();
        console.log('failure', failure);
      });
  }
  edit(driverInOutId) {
    this.route.navigate(['driver-in-out', driverInOutId, 'edit']);
  }
  deleteDetails(driverInOutId) {
    this.alert.alertPromt().then(data => {
      if (Boolean(data)) {
        this.loader.createLoader();
        this.deleteJson.driverInOutId = driverInOutId;
        this.deleteJson.refModifiedBy = this.tranpoterId;
        this.inOutApi.deleteInOut(this.deleteJson, driverInOutId).subscribe(success => {
          this.loader.dismissLoader();
          console.log('success', success);
          this.toast.success(success[0].msg);
          this.ionViewWillEnter();
        },
          failure => {
            this.loader.dismissLoader();
            console.log('failure', failure);
          });
      }
    });
  }

}
