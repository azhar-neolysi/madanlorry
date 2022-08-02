import { ToastService } from 'src/app/services/toast/toast.service';
import { MyBookingService } from 'src/app/services/my-booking/my-booking.service';
import { ManageVehicleService } from 'src/app/services/manage-vehicle/manage-vehicle.service';
import { ManageDriverService } from 'src/app/services/manage-driver/manage-driver.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { LanguageService } from 'src/app/services/language/language.service';
import { DriverInOutService } from 'src/app/services/driver-in-out/driver-in-out.service';
import { AlertService } from './services/alert/alert.service';
import { ApiService } from 'src/app/services/api/api.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Chooser } from '@awesome-cordova-plugins/chooser/ngx';
// import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FileTransfer } from '@awesome-cordova-plugins/file-transfer/ngx';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
// import { GoogleMaps } from '@ionic-native/google-maps/ngx';
import { GoogleMap } from '@capacitor/google-maps';
import { DatePipe } from '@angular/common';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';
import { PowerOptimization } from '@awesome-cordova-plugins/power-optimization/ngx';
import { BackgroundGeolocation } from '@awesome-cordova-plugins/background-geolocation/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { LoaderService } from './services/loader/loader.service';
import { BookingEnquiresService } from './services/booking-enquires/booking-enquires.service';
import { HomePage } from './home/home.page';
import { HomeService } from './services/home/home.service';
import { LoginService } from './services/login/login.service';
import { MyProfileService } from './services/my-profile/my-profile.service';
import { SettingsService } from './services/settings/settings.service';
import { SignupService } from './services/signup/singup.service';

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Chooser,
    FileTransfer,
    File,
    Geolocation,
    BackgroundGeolocation,
    PowerOptimization,
    DatePipe,
    LoaderService,
    AlertService,
    ApiService,
    BookingEnquiresService,
    DriverInOutService,
    HomeService,
    LanguageService,
    LoaderService,
    LocalStorageService,
    LoginService,
    ManageDriverService,
    ManageVehicleService,
    MyBookingService,
    MyProfileService,
    SettingsService,
    SignupService,
    ToastService,
  ],
  bootstrap: [AppComponent],
  // exports:[LoaderService]
})
export class AppModule {}
