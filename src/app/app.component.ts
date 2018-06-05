import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ProfilePage } from '../pages/profile/profile';
import { InboxPage } from '../pages/inbox/inbox';
import { ProductsPage } from '../pages/products/products';
import { BlogsPage } from '../pages/blogs/blogs';
import { SettingsPage } from '../pages/settings/settings';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, 
              public statusBar: StatusBar, 
              public splashScreen: SplashScreen, 
              public alertCtrl: AlertController) {
    this.initializeApp();
    // this.pushSetup();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Login', component: LoginPage },
      { title: 'Register', component: RegisterPage },
      { title: 'Profile', component: ProfilePage },
      { title: 'Inbox', component: InboxPage },
      { title: 'Store', component: ProductsPage },
      { title: 'Blog', component: BlogsPage },
      { title: 'Settings', component: SettingsPage },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  // pushSetup() {
  //   const options: PushOptions = {
  //      android: {
  //        senderID: '417774143228'
  //      },
  //      ios: {
  //          alert: 'true',
  //          badge: true,
  //          sound: 'false'
  //      },
  //      windows: {}
  //   };

  //   const pushObject: PushObject = this.push.init(options);


  //   pushObject.on('notification').subscribe((notification: any) => {
  //     console.log('Received a notification', notification);
  //     if (notification.additionalData.foreground) {
  //       let alert = this.alertCtrl.create({
  //         title: 'New Push Notification',
  //         message: notification.message
  //       });
  //       alert.present();
  //     }
  //   });

  //   pushObject.on('registration').subscribe((registration: any) => {
  //     console.log('Device registered', registration);
  //     alert('Device registered'+ JSON.stringify(registration));
  //   });

  //   pushObject.on('error').subscribe(error => {
  //     console.error('Error with Push plugin', error);
  //     alert('Error with Push plugin'+ error);
  //   });
  // }

}
