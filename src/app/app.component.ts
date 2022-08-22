import { AfterViewInit, Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Platform, MenuController, IonRouterOutlet,AlertController } from '@ionic/angular';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { BehaviorSubject } from 'rxjs';
import { Plugins } from '@capacitor/core';
import { Storage } from '@ionic/storage-angular';
// const { App } = Plugins;

import { filter } from 'rxjs-compat/operator/filter';
import { Router } from '@angular/router';
import { LanguageService } from './services/language/language.service';
import { LocalStorageService } from './services/local-storage/local-storage.service';
import { ToastService } from './services/toast/toast.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit,AfterViewInit,OnDestroy {
  @ViewChild(IonRouterOutlet, { static: false }) routerOutlet: IonRouterOutlet;
  menus = [];
  backButtonSubscription;
  isDriver = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menuCtrl: MenuController,
    private languageService: LanguageService,
    private translate: TranslateService,
    private lsService: LocalStorageService,
    private router: Router,
    private toaster: ToastService,
    private ls: LocalStorageService,
    public storage: Storage,
    public alertController: AlertController,
    private location: Location,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
      this.statusBar.show();
      this.splashScreen.hide();
      this.storage.create();
      this.translate.setDefaultLang('en');
      this.languageService.setInitialLanguage();
    });

    this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
      console.log('Back press handler!');
      if (this.location.isCurrentPathEqualTo('/home') || this.location.isCurrentPathEqualTo('/login')) {

        // Show Exit Alert!
        console.log('Show Exit Alert!');
        this.showExitConfirm();
        processNextHandler();
      } else {

        // Navigate to back page
        console.log('Navigate to back page');
        this.location.back();
        // this.showExitConfirm();
        // processNextHandler();
      }

    });

    this.platform.backButton.subscribeWithPriority(5, () => {
      console.log('Handler called to force close!');
      this.alertController.getTop().then(r => {
        if (r) {
          (navigator as any).app.exitApp();
        }
      }).catch(e => {
        console.log(e);
      });
    });
  }
  showExitConfirm() {
    this.alertController.create({
      header: 'App termination',
      message: 'Do you want to close the app?',
      backdropDismiss: false,
      // mode:'ios',
      cssClass: 'custom-alert',
      buttons: [{
        text: 'Stay',
        role: 'cancel',
        cssClass: 'alert-button-cancel',
        handler: () => {
          console.log('Application exit prevented!');
        }
      }, {
        text: 'Exit',
        cssClass: 'alert-button-confirm',
        handler: () => {
          (navigator as any).app.exitApp();
        }
      }]
    })
      .then(alert => {
        alert.present();
      });
  }

  ionViewWillEnter() {
    // this.platform.backButton.subscribeWithPriority(0, async () => {
    //   console.log('-->>', this.routerOutlet.canGoBack());
    //   if (this.routerOutlet.canGoBack()) {
    //     this.routerOutlet.pop();
    //   }
    //   else if (!this.routerOutlet.canGoBack()) {
    //     navigator['app'].exitApp();
    //   }
    // });
    // this.languageService.getlanguageSubject().subscribe((res) => {
    //   if (res) {
    //     this.formMenuList();
    //   }
    // });
  }
  ngAfterViewInit() {
    // this.backButtonEvent();
  }
  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
  }
  backButtonEvent() {
    this.backButtonSubscription =
      this.platform.backButton.subscribeWithPriority(10, async () => {
        console.log('-->>', this.routerOutlet.canGoBack(), this.router.url);
        if (this.router.url === '/home') {
          (navigator as any).app.exitApp(); // work in ionic 6
        } else if (this.routerOutlet.canGoBack()) {
          this.routerOutlet.pop();
        } else {
          const toast = await this.toaster.warning(
            'Press back again to exit App.'
          );
        }
      });
  }

  ionViewDidLeave() {
    this.backButtonSubscription.unsubscribe();
  }
  ngOnInit() {
    console.log('--->', this.ls.getMydriverId());
    this.formMenuList();
  }
  formMenuList() {
    let myLanguage = this.lsService.getMyLanguage();
    if (!myLanguage) {
      myLanguage = 'en';
    }
    this.translate.use(myLanguage);
    setTimeout(() => {
      let menuTitles;

      const menuIcons = [
        'home',
        'bookmarks-outline',
        'book-outline',
        'bus-outline',
        'man-outline',
        'people-outline',
        'settings-outline',
        'person-outline',
      ];
      this.translate.get('init').subscribe((text: string) => {
        menuTitles = [
          this.translate.instant('menuTitles.Home'),
          this.translate.instant('menuTitles.Booking Enquires'),
          this.translate.instant('menuTitles.My Bookings'),
          this.translate.instant('menuTitles.Manage Vehicle'),
          this.translate.instant('menuTitles.Manage Driver'),
          this.translate.instant('menuTitles.Driver In Out'),
          // this.translate.instant('menuTitles.Track'),
          this.translate.instant('menuTitles.Settings'),
          this.translate.instant('menuTitles.My Profile'),
        ];
      });

      const menuLinks = [
        'home',
        'booking-enquires',
        'my-bookings',
        'manage-vehicle',
        'manage-driver',
        'driver-in-out',
        'settings',
        'my-profile',
      ];
      const menus = [];
      console.log(menuTitles);

      for (let i = 0; i < menuTitles.length; i++) {
        const menuListItem = {
          icon: menuIcons[i],
          title: menuTitles[i],
          url: menuLinks[i],
        };
        menus.push(menuListItem);
      }
      this.menus = menus;
      console.log('menu', this.menus);
    }, 1000);
  }

  closeMenu() {
    this.menuCtrl.close();
  }
}
