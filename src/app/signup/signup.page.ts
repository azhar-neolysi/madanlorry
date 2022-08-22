
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
// import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { DatePipe } from '@angular/common';
import { ToastService } from '../services/toast/toast.service';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@awesome-cordova-plugins/file-transfer/ngx';
import { Chooser } from '@awesome-cordova-plugins/chooser/ngx';
import { environment } from 'src/environments/environment';
import { LoaderService } from '../services/Loader/loader.service';
import { SignupService } from '../services/signup/singup.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  registrationForm = this.fb.group({
    name: ['', [Validators.required]],
    gstno: ['', [Validators.required,
    Validators.minLength(15)]],
    gstDocUrl: ['', [Validators.required]],
    panDocUrl: ['', [Validators.required]],
    pannumber: ['', [Validators.required,
    Validators.minLength(10)]],
    legalName: ['', [Validators.required]],
    address: ['', [Validators.required]],
    natureOfBusiness: ['', [Validators.required]],
    entityType: ['', [Validators.required]],
    registrationType: ['', [Validators.required]],
    deptCodeAndType: ['', [Validators.required]],
    registrationDate: ['', [Validators.required]],
    telePhone: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
    mobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    email: ['', [Validators.required, Validators.email]],
    website: [''],
    description: [''],
    refReferenceListCityId: ['', [Validators.required]],
    refReferenceListStateId: ['', [Validators.required]],
    refReferenceListCountryId: ['', [Validators.required]],
    address1: ['', [Validators.required]],
    address2: ['', [Validators.required]],
    address3: [''],
    address4: ['', [Validators.required]],
    // password: ['', [Validators.required, Validators.minLength(7)]],
    // cnfpassword: ['', [Validators.required, Validators.minLength(7)]],
    refOrgId: [3],
    refRoleId: [],
    refCreatedBy: []

  });
  password = '';
  cnfpassword = '';
  userForm = this.fb.group({
    refOrgid: [3],
    userName: [''],
    refCreatedBy: [],
    email: [''],
    mobileNo: [''],
    password: [''],
    processing: ['0'],
    comments: [''],
    emailVerified: [true],
    refEmpId: [null],
    refCustId: [],
    refDriverId: [null],
    refConsignerId: [null]
  });
  states: any = [];
  citys: any = [];
  countrys: any = [];
  gstDetails: any = [];
  gstNo = '';
  companyName = '';
  doNotProceed = false;
  lorryOwner: any = [];
  gstDocUrl = '';
  panDocUrl = '';
  gstUpload = false;
  panUpload = false;
  gstSourceUrl: string;
  panSourceUrl: string;
  constructor(private signUpApi: SignupService,
    private router: Router,
    private fb: FormBuilder,
    private toast: ToastService,
    private datePipe: DatePipe,
    private fileChooser: Chooser,
    private fileTransfer: FileTransfer,
    private loader: LoaderService) { }

  ngOnInit() { }
  ionViewWillEnter() {
    this.loadIntialDetails();
  }

  loadIntialDetails() {

    this.signUpApi.getReferceListDatas('state').subscribe(success => {
      this.states = success;
      console.log(success);
    }, failure => { });
    this.signUpApi.getReferceListDatas('city').subscribe(success => {
      this.citys = success;
    }, failure => { });
    this.signUpApi.getReferceListDatas('country').subscribe(success => {
      this.countrys = success;
    }, failure => { });
    this.signUpApi.getLorryOwnerRole().subscribe(success => {
      this.lorryOwner = success[0];
      console.log('success', success);
    }, failure => { });

  }
  getDetailsFromGst() {
    this.loader.createLoader();
    this.gstNo = this.registrationForm.get('gstno').value.trim();
    if (this.gstNo !== '')
      {console.log('gst-->', this.gstNo);}
    this.signUpApi.getGstDetails(this.gstNo).subscribe(success => {
      this.loader.dismissLoader();
      console.log('success', success);
      this.gstDetails = success;
      this.setDataFromGst(this.gstDetails);
    }, failure => {
      this.loader.dismissLoader();
      console.log('failure', failure);
    });

  }
  setDataFromGst(data) {
    console.log('dataaa', data);
    if (data && data.error) {
      this.toast.danger('Please enter valid GST NO');
    }
    this.companyName = data.taxpayerInfo.tradeNam.trim();
    const panNo = this.gstNo.substring(2, 12);
    let regDate: string = data.taxpayerInfo.rgdt;
    const dateString = regDate.split('/');
    regDate = dateString[2] + '-' + dateString[1] + '-' + dateString[0];
    regDate += 'T00:00:00';
    console.log(regDate);
    const address = data.taxpayerInfo.pradr.addr.bno + ' ' + data.taxpayerInfo.pradr.addr.st + ' '
      + data.taxpayerInfo.pradr.addr.loc + ' ' + data.taxpayerInfo.pradr.addr.pncd;
    this.registrationForm.get('legalName').setValue(data.taxpayerInfo.lgnm);
    this.registrationForm.get('registrationDate').setValue(regDate);
    this.registrationForm.get('name').setValue(this.companyName);
    this.registrationForm.get('entityType').setValue(data.taxpayerInfo.ctb);
    this.registrationForm.get('registrationType').setValue(data.taxpayerInfo.dty);
    this.registrationForm.get('deptCodeAndType').setValue(data.taxpayerInfo.ctj);
    this.registrationForm.get('natureOfBusiness').setValue(data.taxpayerInfo.pradr.ntr);
    this.registrationForm.get('address').setValue(address);
    this.registrationForm.get('pannumber').setValue(panNo);
    this.registrationForm.get('refRoleId').setValue(this.lorryOwner.roleId);
    this.registrationForm.updateValueAndValidity();
  }
  submit() {
    console.log('f = ', this.registrationForm);
    console.log('dp = ', this.doNotProceed);
    console.log('gst = ', this.gstSourceUrl);
    console.log('pd = ', this.panSourceUrl);

    if (this.registrationForm.valid && !this.doNotProceed && this.gstDocUrl !== '' && this.panDocUrl !== '') {
      this.loader.createLoader();
      console.log('this.registrationForm.value', this.registrationForm.value);
      this.fileUpload(this.registrationForm.value);
    }
    else {
      this.toast.danger('Fill/Upload all required Details');
      this.registrationForm.markAllAsTouched();
      this.registrationForm.updateValueAndValidity();
    }
  }
  registerData(req) {
    this.signUpApi.registerDetails(req).subscribe(
      success => {
        console.log('success registered', success);
        if (success[0].status === 1) {
          // this.toast.success(success[0].msg);
          this.saveUser(success[0].id);
        }
        else {
          this.toast.danger(success[0].msg);
          return;
        }
      },
      failure => {
        this.loader.dismissLoader();
        console.log('failure re', failure);
      });

  }
  saveUser(refCustId) {
    this.setUserData(refCustId);
    this.signUpApi.addUser(this.userForm.value).subscribe(success => {
      console.log('success', success);
      this.loader.dismissLoader();
      if (success[0].status === 1) {
        this.toast.success(success[0].msg);
        this.router.navigate(['']);
      }
      else {
        this.toast.danger(success[0].msg);
        return;
      }
    }, failure => {
      this.loader.dismissLoader();
      console.log('failure', failure);
      this.toast.danger(failure[0].msg);
      return;
    });
  }
  setUserData(refCustId) {
    this.userForm.get('refCustId').setValue(refCustId);
    this.userForm.get('userName').setValue(this.registrationForm.get('legalName').value);
    this.userForm.get('email').setValue(this.registrationForm.get('email').value);
    // this.userForm.get('processing').setValue(1);
    this.userForm.get('comments').setValue(this.lorryOwner.roleName);
    // this.userForm.get('emailVerified').setValue(false);
    this.userForm.get('password').setValue(this.password);
    this.userForm.get('mobileNo').setValue(this.registrationForm.get('mobile').value);
    this.userForm.get('refCreatedBy').setValue(refCustId);


  }
  checkCnfPassword() {
    this.doNotProceed = false;
    if ((this.password === '' && this.cnfpassword === '')) {
      this.toast.warning(`Enter valid password `);
      this.doNotProceed = true;
      return;
    }
    if (this.password !== this.cnfpassword) {
      this.toast.warning(`Password and confirm password doesn't match `);
      this.doNotProceed = true;
      return;
    }
  }
  chooseFile(docType) {
    console.log('chooseFile');
    // const options: FileChooserOptions = {
    //   mime: '"application/pdf"'
    // }
    if (docType === 'gstno') {
      if (!this.registrationForm.get('gstno').value) {
        this.toast.warning('Please enter gst Number before uploading document');
        return;
      }
    }
    else {
      if (!this.registrationForm.get('pannumber').value) {
        this.toast.warning('Please enter pan Number before uploading document');
        return;
      }
    }

    this.fileChooser.getFile().then((resp) => {
      console.log(resp);
      if (docType === 'gstno') {
        this.gstDocUrl = resp.toString();
        this.gstSourceUrl = resp.dataURI;
        this.gstUpload = true;
        console.log(this.gstSourceUrl,this.gstUpload);
      }
      else {
        this.panDocUrl = resp.toString();
        this.panSourceUrl = resp.dataURI;
        this.panUpload = true;
        console.log(this.panUpload,this.panSourceUrl);
      }

    }).catch((err) => {
      console.log(err);

    });
  }
  fileUpload(req) {
    const fileTransfer: FileTransferObject = this.fileTransfer.create();

    if (this.gstUpload) {
      const gstOptions: FileUploadOptions = {
        fileKey: 'file',
        params: {
          filename: `${req.gstno}TransGST.pdf`
        }
      };
      req.gstDocUrl = `F:/TransporterGST/${req.gstno}TransGST.pdf`;
      fileTransfer.upload(this.gstSourceUrl, `${environment.serverUrl}Common/PostdriverUploads/?file`, gstOptions).then((res) => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      });
    }
    if (this.panUpload) {
      const panOptions: FileUploadOptions = {
        fileKey: 'file',
        params: {
          filename: `${req.Pannumber}TransPAN.pdf`
        }
      };
      req.panDocUrl = `F:/TransporterPAN/${req.Pannumber}TransPAN.pdf`;
      fileTransfer.upload(this.panSourceUrl, `${environment.serverUrl}Common/PostdriverUploads/?file`, panOptions).then((res) => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      });
    }
    this.registerData(req);
  }


}
