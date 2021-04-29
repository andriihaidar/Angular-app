import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ToastOptions } from '@ionic/core/dist/types/components/toast/toast-interface';
import { ThemeTypes } from 'constants/components.constants';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  DEFAULT_DURATION = 2000;

  constructor(private toastController: ToastController) { }

  async presentCustomToast(toastOptions: ToastOptions) {
    const toast = await this.toastController.create(toastOptions);
    toast.present();
  }

  presentSuccessToast(message: string) {
    this.presentToast(ThemeTypes.SUCCESS, message);
  }

  presentDangerToast(message: string) {
    this.presentToast(ThemeTypes.DANGER, message);
  }

  async presentToast(color: string, message: string) {
    const toastOptions = {
      duration: this.DEFAULT_DURATION,
      color,
      message
    };
    const toast = await this.toastController.create(toastOptions);
    toast.present();
  }
}
