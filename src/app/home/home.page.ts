import { Component, NgZone, ViewChild, OnInit, OnDestroy } from '@angular/core';

import {
  BackgroundGeolocation,
  BackgroundGeolocationConfig,
  BackgroundGeolocationEvents,
  BackgroundGeolocationResponse,
} from '@awesome-cordova-plugins/background-geolocation/ngx';
import {
  Geolocation,
  GeolocationOptions,
  Geoposition,
} from '@awesome-cordova-plugins/geolocation/ngx';
// import { PowerManagement } from '@ionic-native/power-management/ngx';
import { PowerOptimization } from '@awesome-cordova-plugins/power-optimization/ngx';
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast/toast.service';
import { HomeService } from '../services/home/home.service';
import { LoaderService } from '../services/loader/loader.service';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { Storage } from '@ionic/storage-angular';

declare let window: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit,OnDestroy {

  @ViewChild(IonRouterOutlet, { static: false }) routerOutlet: IonRouterOutlet;

  transportRate: any = [];
  config: BackgroundGeolocationConfig;
  public watch: any;
  public lat = 0;
  public lng = 0;
  backButtonSubscription;

  constructor(
    private homeApi: HomeService,
    private loader: LoaderService,
    public zone: NgZone,
    private lsService: LocalStorageService,
    public backgroundGeolocation: BackgroundGeolocation,
    public geolocation: Geolocation,
    private platform: Platform,
    private router: Router,
    private toaster: ToastService,
    private powerOptimization: PowerOptimization,
    private storage: Storage

  ) {}
  ngOnInit() {
    try {
      // this.powerManagement.acquire();
      this.powerOptimization.IsIgnoringBatteryOptimizations();
      this.trackLocation();
    } catch (e) {
      console.log(e);
    }
    // this.backButtonEvent();
    this.storage.create();
  }
  ngOnDestroy() {
    // this.powerOptimization.release();
  }
  backButtonEvent() {
    this.backButtonSubscription =
      this.platform.backButton.subscribeWithPriority(10, async () => {
        // console.log('-->>', this.routerOutlet.canGoBack(), this.router.url);
        if (this.router.url === '/home') {
          // this.powerOptimization.release();
          (navigator as any).app.exitApp(); // work in ionic 4
        } else if (this.routerOutlet.canGoBack()) {
          this.routerOutlet.pop();
        } else {
          // this.powerOptimization.release();
          const toast = await this.toaster.warning(
            'Press back again to exit App.'
          );
        }
      });
  }
  ionViewWillEnter() {
    this.getHomeData();
  }
  getHomeData() {
    this.loader.createLoader();
    console.log('test');

    this.homeApi.getTransportRate().subscribe(
      (success) => {
        console.log('sucess', success);
        this.transportRate = success;
        this.loader.dismissLoader();
      },
      (failure) => {
        this.loader.dismissLoader();
        console.log('failure', failure);
      }
    );
  }
  trackLocation() {
    this.config = {
      desiredAccuracy: 0,
      stationaryRadius: 20,
      distanceFilter: 10,
      debug: false, //  enable this hear sounds for background-geolocation life-cycle.
      interval: 1000,
      // fastestInterval: 100,
      // stopOnTerminate: false, // enable this to clear background location settings when the app terminates
    };
    console.log('logged');

    this.backgroundGeolocation.configure(this.config).then(
      () => {
        console.log(',,,', this.config);
        this.backgroundGeolocation
          .on(BackgroundGeolocationEvents.location)
          .subscribe(
            (location: BackgroundGeolocationResponse) => {
              console.log('my location', location);
              this.zone.run(() => {
                this.lat = location.latitude;
                this.lng = location.longitude;
              });

              this.homeApi
                .getVehicleId(this.lsService.getMydriverId())
                .subscribe(
                  (success) => {
                    console.log(success);
                    this.lsService.setmyVehicleId(success[0].vehicleId);
                    this.updateLorryLocation(this.lsService.getmyVehicleId());
                  },
                  (failure) => {}
                );
            },
            (err) => {
              console.log(err);
            }
          );
      },
      (err) => {
        console.log(err);
      }
    );
    this.backgroundGeolocation.start();

    this.liveTracking();
  }
  liveTracking() {
    const options: GeolocationOptions = {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 0,
    };
    this.watch = this.geolocation
      .watchPosition(options)
      .pipe()
      .subscribe((position: Geoposition) => {
        console.log(position, this.lsService.getmyVehicleId());
        if (position.coords)
          {this.zone.run(() => {
            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;
          });}
        if (this.lsService.getmyVehicleId() != null) {
          console.log('updating');
          this.updateLorryLocation(this.lsService.getmyVehicleId());
          console.log('updated');
        }
      });
  }
  public stopTracking() {
    console.log('stopTracking');
    this.backgroundGeolocation.finish();
    this.watch.unsubscribe();
  }
  updateLorryLocation(vehicleId) {
    const req = {
      vehicleId: parseFloat(vehicleId),
      address4: `${this.lat},${this.lng}`,
    };
    console.log(req);

    this.homeApi.updateLorryLocation(parseFloat(vehicleId), req).subscribe(
      (sucess) => {
        console.log(sucess);
      },
      (failure) => {
        console.log(failure);
      }
    );
  }
}
// function onSuccess(onSuccess: any) {
//   console.log('inside');

//   throw new Error('Function not implemented.');
// }
