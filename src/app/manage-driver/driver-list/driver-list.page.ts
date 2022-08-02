import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { LoaderService } from 'src/app/services/Loader/loader.service';
import { AlertService } from 'src/app/services/alert/alert.service';
import { ManageDriverService } from 'src/app/services/manage-driver/manage-driver.service';

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.page.html',
  styleUrls: ['./driver-list.page.scss'],
})
export class DriverListPage implements OnInit {

  drivers: any = [];
  driverDeleteJson: any = {};
  userId: number;
  transpoterId: number;
  constructor(private router: Router,
    private driverApi: ManageDriverService,
    private ls: LocalStorageService,
    private toast: ToastService,
    private alert: AlertService,
    private loader: LoaderService) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.userId = Number(this.ls.getUserId());
    this.transpoterId = Number(this.ls.getCustomerId());
    this.getDriverList(this.transpoterId);
  }

  getDriverList(transpoterId) {
    console.log('inside');
    this.loader.createLoader();
    this.driverApi.getDriverDetails(transpoterId).subscribe(success => {
      console.log('success', success);
      this.drivers = success;
      this.loader.dismissLoader();
    },
      failure => {
        this.loader.dismissLoader();
        console.log('failure', failure);
      });
    this.loader.dismissLoader();
  }
  createDriver() {
    this.router.navigate(['manage-driver', 'create']);
  }
  edit(driver) {
    this.router.navigate(['manage-driver', 'edit', driver.driverId, driver.userId]);
  }
  deleteDriver(driverId) {
    this.alert.alertPromt().then(data => {
      if (Boolean(data)) {
        this.loader.createLoader();
        this.driverDeleteJson.driverId = driverId;
        this.driverDeleteJson.refrefCreatedBy = this.userId;
        this.driverApi.deleteDriver(this.driverDeleteJson, driverId).subscribe(success => {
          console.log('success', success);
          this.toast.success(success[0].msg);
          this.ionViewWillEnter();
          this.loader.dismissLoader();
        }, failure => {
          this.loader.dismissLoader();
        });
      }
    });
    this.loader.dismissLoader();
  }

}
