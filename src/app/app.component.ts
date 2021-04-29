import { Component } from '@angular/core';
import { Capacitor, Plugins, StatusBarStyle } from '@capacitor/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar as NgxStatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';
import { PushNotificationsService } from './core/services/push-notifications.service';

const { StatusBar, PushNotifications } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: NgxStatusBar,
    private pushNotificationsServices: PushNotificationsService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (Capacitor.platform !== 'web') {
        this.pushNotificationsServices.initPush();
        PushNotifications.removeAllDeliveredNotifications();

        if (this.platform.is('ios')) {
          StatusBar.setStyle({
            style: StatusBarStyle.Light,
          });
        } else {
          this.statusBar.styleDefault();
          this.splashScreen.hide();
        }
      }
    });
  }
}
