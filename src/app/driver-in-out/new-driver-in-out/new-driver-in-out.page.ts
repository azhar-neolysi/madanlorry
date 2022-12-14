
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { LoaderService } from 'src/app/services/Loader/loader.service';
import { DriverInOutService } from 'src/app/services/driver-in-out/driver-in-out.service';

@Component({
  selector: 'app-new-driver-in-out',
  templateUrl: './new-driver-in-out.page.html',
  styleUrls: ['./new-driver-in-out.page.scss'],
})
export class NewDriverInOutPage implements OnInit {

  drivers: any = [];
  failure = false;
  vehicles: any = [];
  timeForm = this.fb.group({
    refDriverId: ['', [Validators.required]],
    refVehicleId: ['', [Validators.required]],
    inTime: ['', [Validators.required]],
    outTime: ['', [Validators.required]],
    refOrgId: [3],

  });
  driverInOutId = -1;
  userId;
  driverData: any = [];
  currentYear;
  maxyear;
  date;
  transpoterId;
  isEdit = false;
  constructor(private route: Router,
    private inOutApi: DriverInOutService,
    private fb: FormBuilder,
    private aroute: ActivatedRoute,
    private ls: LocalStorageService,
    private toast: ToastService,
    private datePipe: DatePipe,
    private loader: LoaderService) { }

  ngOnInit() {

  }
  ionViewWillEnter() {
    this.userId = Number(this.ls.getUserId());
    this.transpoterId = Number(this.ls.getCustomerId());
    this.getVehicleDetails(this.transpoterId);
    this.getDriverDetails(this.transpoterId);
    this.loadDates();
    this.aroute.params.subscribe(data => {
      this.driverInOutId = data.driverInOutId;
    });
    if (this.driverInOutId > -1) {
      this.isEdit = true;
      this.loadInOutData(this.driverInOutId);
    }

  }
  loadDates() {
    this.date = new Date('01' + '-' + '01' + '-' + new Date().getFullYear().toString());
    this.currentYear = this.datePipe.transform(this.date, 'yyyy-MM-dd').toString();
    this.date.setFullYear(this.date.getFullYear() + 20);
    this.maxyear = this.datePipe.transform(this.date, 'yyyy-MM-dd').toString();
  }
  getDriverDetails(transpoterId) {
    this.inOutApi.getDrivers(transpoterId).subscribe(
      success => {
        // console.log('success', success);
        this.drivers = success;
      },
      failure => {
        console.log('failure', failure);
      });
  }
  getVehicleDetails(transpoterId) {
    this.inOutApi.getVehicles(transpoterId).subscribe(
      success => {
        // console.log('success', success);
        this.vehicles = success;
      },
      failure => {
        console.log('failure', failure);
      });
  }
  loadInOutData(id) {
    this.loader.createLoader();
    this.inOutApi.getInOutDetail(id).subscribe(
      success => {
        this.loader.dismissLoader();
        // console.log(id, 'success', success);
        // this.drivers = success;
        this.driverData = success[0];
        this.setDataToForm(success[0]);
      },
      failure => {
        this.loader.dismissLoader();
        console.log('failure', failure);
      }
    );
  }
  setDataToForm(data) {
    this.timeForm.get('refDriverId').setValue(data.refDriverId);
    // console.log('data.refVehicleId', data.refVehicleId);
    this.timeForm.get('refVehicleId').setValue(data.refVehicleId);
    this.timeForm.get('inTime').setValue(data.inTime);
    this.timeForm.get('outTime').setValue(data.outTime);
    this.timeForm.updateValueAndValidity();
  }


  submit() {
    if (this.timeForm.valid) {
      if (this.driverInOutId > -1) {
        this.editDetails(this.timeForm.value);
      }
      else {
        this.saveNewDetails(this.timeForm.value);
      }
    }
    else {
      this.failure = true;
      this.toast.danger('Fill all the fileds');
    }
  }
  editDetails(data) {
    this.loader.createLoader();
    const req = data;
    req.driverInOutId = Number(this.driverInOutId);
    req.isActive = this.driverData.isActive;
    req.refModifiedBy = this.userId;
    console.log('req-->', req);
    this.inOutApi.editInOut(req, this.driverInOutId).subscribe((success: any) => {
      this.loader.dismissLoader();
      console.log('success', success, 'success.status', success.status);
      if (success[0].status === 2) {
        console.log('inside');
        this.toast.success(success[0].msg);
        this.route.navigate(['driver-in-out']);
      }

    }, failure => { this.loader.dismissLoader(); console.log('failure', failure); });
  }
  saveNewDetails(data) {
    this.loader.createLoader();
    const req = data;
    req.refrefCreatedBy = this.userId;
    this.inOutApi.saveInOut(req).subscribe((success: any) => {
      this.loader.dismissLoader();
      console.log('success', success);
      if (success[0].status === 1) {
        this.toast.success(success[0].msg);
        this.route.navigate(['driver-in-out']);
      }

    }, failure => { this.loader.dismissLoader(); console.log('failure', failure); });
  }

}
