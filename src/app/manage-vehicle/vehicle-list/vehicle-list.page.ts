
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { LoaderService } from 'src/app/services/Loader/loader.service';
import { AlertService } from 'src/app/services/alert/alert.service';
import { ManageVehicleService } from 'src/app/services/manage-vehicle/manage-vehicle.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.page.html',
  styleUrls: ['./vehicle-list.page.scss'],
})
export class VehicleListPage implements OnInit {

  vehicles: any = [];
  transpoterId: number;
  vehicleId = '';
  deleteJson: any = {};
  constructor(private router: Router,
    private vehicleApi: ManageVehicleService,
    private ls: LocalStorageService,
    private toast: ToastService,
    private alert: AlertService,
    private loader: LoaderService) { }

  ngOnInit() { }
  ionViewWillEnter() {
    this.transpoterId = Number(this.ls.getCustomerId());
    // this.transpoterId = 6;
    console.log('this', this.transpoterId);
    this.getVehicles(this.transpoterId, this.vehicleId);
  }

  getVehicles(transpoterId, vehicleId) {
    this.loader.createLoader();
    this.vehicleApi.getVehicles(transpoterId, vehicleId).subscribe(success => {
      console.log('vehiclesuccess', success);
      this.vehicles = success;
      this.loader.dismissLoader();
    },
      failure => {
        this.loader.dismissLoader();
        console.log('vehiclefailure', failure);
      });
    this.loader.dismissLoader();
  }
  createVehicle() {
    this.router.navigate(['manage-vehicle', 'create']);
  }
  edit(vehicleId) {
    this.router.navigate(['manage-vehicle', 'edit', vehicleId]);
  }
  deleteVehicle(vehicleId) {
    this.alert.alertPromt().then(data => {
      if (Boolean(data)) {
        this.loader.createLoader();
        this.deleteJson.VehicleId = vehicleId;
        this.deleteJson.RefModifiedBy = this.transpoterId;
        this.vehicleApi.deleteVehicle(vehicleId, this.deleteJson).subscribe(success => {
          console.log('success', success);
          this.loader.dismissLoader();
          this.toast.success(success[0].msg);
          this.ionViewWillEnter();
        },
          failure => {
            this.loader.dismissLoader();
            console.log('failure', failure);
            this.toast.danger(failure[0].msg);
          });
      }
    });
    this.loader.dismissLoader();
  }

}
