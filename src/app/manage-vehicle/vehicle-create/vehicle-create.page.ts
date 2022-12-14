
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
// import { FileChooser, FileChooserOptions } from '@ionic-native/file-chooser/ngx';
import { Chooser } from '@awesome-cordova-plugins/chooser/ngx';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@awesome-cordova-plugins/file-transfer/ngx';
import { environment } from 'src/environments/environment';
import { ToastService } from 'src/app/services/toast/toast.service';
import { LoaderService } from 'src/app/services/Loader/loader.service';
import { ManageVehicleService } from 'src/app/services/manage-vehicle/manage-vehicle.service';

@Component({
  selector: 'app-vehicle-create',
  templateUrl: './vehicle-create.page.html',
  styleUrls: ['./vehicle-create.page.scss'],
})
export class VehicleCreatePage implements OnInit {
  transpoterId;
  // refCust: number;
  currentYear;
  maxyear;
  date;
  vehicleForm = this.fb.group({
    refReferenceListVehicleTypeid: ['', [Validators.required]],
    vehicleNo: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(10)]],
    fcValidity: ['', [Validators.required]],
    fCDocument: ['C:/', [Validators.required]],
    insurenceValidty: ['', [Validators.required]],
    insurenceDocument: ['C:/', [Validators.required]],
    rCDocument: ['C:/', [Validators.required]],
    description: ['',],
    refReferenceListCityId: ['', [Validators.required]],
    refReferenceListStateId: ['', [Validators.required]],
    refReferenceListCountryId: ['', [Validators.required]],
    address1: ['', [Validators.required]],
    address2: ['', [Validators.required]],
    address3: [''],
    address4: ['', [Validators.required]],
    refOrgId: [3],
    refCustId: [],
  });
  vehicleEditId = -1;
  vehicleType: any = [];
  states: any = [];
  citys: any = [];
  countrys: any = [];
  failure = false;
  userId;
  vehicleEditData: any = [];
  fcDocumentUrl = '';
  insurenceDocUrl = '';
  rcDocUrl = '';
  fcUpload = false;
  insurenceUpload = false;
  rcUpload = false;
  isUploaded = false;
  constructor(private fb: FormBuilder,
    private vehicleApi: ManageVehicleService,
    private aRoute: ActivatedRoute,
    private router: Router,
    private toast: ToastService,
    private ls: LocalStorageService,
    private datePipe: DatePipe,
    private fileChooser: Chooser,
    private fileTransfer: FileTransfer,
    private loader: LoaderService) { }

  ngOnInit() { }
  ionViewWillEnter() {
    this.transpoterId = Number(this.ls.getCustomerId());
    console.log('thissssss', this.transpoterId);

    this.userId = Number(this.ls.getUserId());
    this.loadDates();
    this.loadIntialDetails();
    this.getParamData();
    if (this.vehicleEditId > -1) {
      this.loadEditDetails(this.transpoterId, this.vehicleEditId);
    }
  }
  loadDates() {
    this.date = new Date();
    this.currentYear = this.datePipe.transform(this.date, 'yyyy-MM-dd').toString();
    this.date.setFullYear(this.date.getFullYear() + 20);
    this.maxyear = this.datePipe.transform(this.date, 'yyyy-MM-dd').toString();

  }

  loadIntialDetails() {
    this.vehicleApi.getByReferenceList('VehicleType').subscribe(success => {
      console.log(success);
      this.vehicleType = success;
    }, failure => { });
    this.vehicleApi.getByReferenceList('state').subscribe(success => {
      this.states = success;
      console.log(success);
    }, failure => { });
    this.vehicleApi.getByReferenceList('city').subscribe(success => {
      this.citys = success;
    }, failure => { });
    this.vehicleApi.getByReferenceList('country').subscribe(success => {
      this.countrys = success;
    }, failure => { });
  }
  getParamData() {
    this.aRoute.params.subscribe(data => {
      this.vehicleEditId = data.vehicleId;
      console.log('this.vehicleEditId', this.vehicleEditId);
    });
  }
  loadEditDetails(transpoterId, vehicleId) {
    this.loader.createLoader();
    this.vehicleApi.getVehicles(transpoterId, vehicleId).subscribe(
      success => {
        this.loader.dismissLoader();
        console.log('success', success[0]);
        this.vehicleEditData = success[0];
        this.setDataToForm(success[0]);
      },
      failure => {
        this.loader.dismissLoader();
      });
  }
  setDataToForm(data) {
    this.vehicleForm.get('refReferenceListVehicleTypeid').setValue(data.rlvtId);
    this.vehicleForm.get('vehicleNo').setValue(data.vvberVehicleNo);
    this.vehicleForm.get('fcValidity').setValue(data.fcvalidity);
    this.vehicleForm.get('insurenceValidty').setValue(data.insurenceValidty);
    this.vehicleForm.get('description').setValue(data.description);
    this.vehicleForm.get('refReferenceListCityId').setValue(data.vehiLocationCityId);
    this.vehicleForm.get('refReferenceListStateId').setValue(data.vehiLocationStateId);
    this.vehicleForm.get('refReferenceListCountryId').setValue(data.vehiLocationCountryId);
    this.vehicleForm.get('fCDocument').setValue(data.fcdocument);
    this.vehicleForm.get('insurenceDocument').setValue(data.insurenceDocument);
    // this.vehicleForm.get('refReferenceListCountryId')
    this.vehicleForm.get('address1').setValue(data.vehiLocationAddress1);
    this.vehicleForm.get('address2').setValue(data.vehiLocationAddress2);
    this.vehicleForm.get('address3').setValue(data.vehiLocationAddress3);
    this.vehicleForm.get('address4').setValue(data.vehiLocationAddress4);
    this.vehicleForm.updateValueAndValidity();
  }

  submit() {
    if (this.vehicleForm.valid) {
      this.loader.createLoader();
      this.vehicleForm.get('refCustId').setValue(this.transpoterId);
      this.fileUpload(this.vehicleForm.value);
    }
    else {
      // this.failure = true;
      console.log(this.vehicleForm);

      this.toast.danger('Fill/Upload all the required fields');
      this.vehicleForm.markAllAsTouched();
      this.vehicleForm.markAsDirty();
      this.vehicleForm.updateValueAndValidity();
    }
  }
  editDetails(data) {
    const req = data;
    req.VehicleId = Number(this.vehicleEditId);
    req.isActive = true;
    req.refModifiedBy = this.userId;
    console.log('req-->', req);
    this.vehicleApi.editVehicle(req, this.vehicleEditId).subscribe((success: any) => {
      console.log('success', success, 'success.status', success[0].status);
      if (success[0].status === 2) {
        this.loader.dismissLoader();
        this.toast.success(success[0].msg);
        this.router.navigate(['manage-vehicle']);
      }
      this.loader.dismissLoader();
    }, failure => {
      this.loader.dismissLoader();
      console.log('failure', failure);
      this.toast.danger(failure[0].msg);
    });
  }
  saveNewDetails(data) {
    const req = data;
    console.log('req', req);
    req.refCreatedBy = this.userId;
    this.vehicleApi.saveVehicle(req).subscribe((success: any) => {
      console.log('success', success);
      if (success[0].status === 1) {
        this.loader.dismissLoader();
        this.toast.success(success[0].msg);
        this.router.navigate(['manage-vehicle']);
      }
      this.loader.dismissLoader();
    }, failure => { this.loader.dismissLoader(); console.log('failure', failure); });
  }

  chooseFile(docType) {
    console.log('chooseFile');
    // const options: FileChooserOptions = {
    //   mime: '"application/pdf"'
    // }
    if (docType === 'FC Doc') {
      if (!this.vehicleForm.get('fcValidity').value) {
        this.toast.warning('Please enter FC Validity before uploading document');
        return;
      }
    }
    else if (docType === 'Insurence Doc') {
      if (!this.vehicleForm.get('insurenceValidty').value) {
        this.toast.warning('Please enter Insurence Validity before uploading document');
        return;
      }
    }

    this.fileChooser.getFile().then((resp) => {
      console.log(resp);
      if (docType === 'FC Doc') {
        this.fcDocumentUrl = resp.toString();
        // this.fcSourceUrl=resp.uri;
        this.fcUpload = true;
        console.log(this.fcDocumentUrl,this.fcUpload);
      }
      else if (docType === 'Insurence Doc') {
        this.insurenceDocUrl = resp.toString();
        // this.insurenceSourceUrl=resp.uri;
        this.insurenceUpload = true;
        console.log(this.insurenceDocUrl,this.insurenceUpload);

      }
      else {
        this.rcDocUrl = resp.toString();
        // this.rcSourceUrl=resp.uri;
        this.rcUpload = true;
        console.log(this.rcDocUrl,this.rcUpload);

      }

    }).catch((err) => {
      console.log(err);

    });
  }
  fileUpload(req) {
    const fileTransfer: FileTransferObject = this.fileTransfer.create();

    if (this.fcUpload) {
      const fcOptions: FileUploadOptions = {
        fileKey: 'file',
        params: {
          filename: `${req.licenceNo}TransFC.pdf`
        }
      };
      req.fCDocument = `F:/TransporterFCDocument/${req.vehicleNo}TransFC.pdf`;
      fileTransfer.upload(this.fcDocumentUrl, `${environment.serverUrl}Common/PostdriverUploads/?file`, fcOptions).then((res) => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      });
    }
    if (this.insurenceUpload) {
      const insuranceOptions: FileUploadOptions = {
        fileKey: 'file',
        params: {
          filename: `${req.licenceNo}TransIns.pdf`
        }
      };
      req.fCDocument = `F:/TransporterInsurenceDocument/${req.vehicleNo}TransIns.pdf`;
      fileTransfer.upload(this.fcDocumentUrl, `${environment.serverUrl}Common/PostdriverUploads/?file`, insuranceOptions).then((res) => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      });
    } if (this.rcUpload) {
      const insuranceOptions: FileUploadOptions = {
        fileKey: 'file',
        params: {
          filename: `${req.licenceNo}TransRC.pdf`
        }
      };
      req.fCDocument = `F:/TransporterRCDocument/${req.vehicleNo}TransRC.pdf`;
      fileTransfer.upload(this.fcDocumentUrl, `${environment.serverUrl}Common/PostdriverUploads/?file`, insuranceOptions).then((res) => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      });
    }

    if (this.vehicleEditId > -1) {
      this.editDetails(req);
    }
    else {
      this.saveNewDetails(req);
    }





  }
}
