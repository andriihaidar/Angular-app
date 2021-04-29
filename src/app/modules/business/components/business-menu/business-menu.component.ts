import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ServiceStatuses } from 'constants/components.constants';
import { BusinessPreviewEditModalComponent } from 'src/app/modules/create-business/components/business-preview-edit-modal/business-preview-edit-modal.component';
import { DeleteBusinessComponent } from '../../delete-business/delete-business.component';
import { ToggleBusinessStatusModalComponent } from '../toggle-business-status-modal/toggle-business-status-modal.component';

@Component({
  selector: 'app-business-menu',
  templateUrl: './business-menu.component.html',
  styleUrls: ['./business-menu.component.scss']
})
export class BusinessMenuComponent {
  @Input() businessId: string;
  @Input() businessStatus: string;

  constructor(private modalCtrl: ModalController) { }

  async presentEditModal() {
    const modal = await this.modalCtrl.create({
      component: BusinessPreviewEditModalComponent,
      swipeToClose: true,
    });
    return await modal.present();
  }

  async presentDeleteModal() {
    this.dismiss();
    const modal = await this.modalCtrl.create({
      component: DeleteBusinessComponent,
      swipeToClose: true,
      componentProps: {
        businessId: this.businessId,
      }
    });
    return await modal.present();
  }

  showEditBusinessModal() {
    this.dismiss();
    this.presentEditModal();
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  async toggleBusinessStatus() {
    this.dismiss();
    const modal = await this.modalCtrl.create({
      component: ToggleBusinessStatusModalComponent,
      cssClass: 'popup',
      componentProps: {
        businessId: this.businessId,
        status: this.businessStatus,
      }
    });
    return await modal.present();
  }

  get isPublished(): boolean {
    return this.businessStatus === ServiceStatuses.PUBLISHED;
  }

  get isDraft(): boolean {
    return this.businessStatus === ServiceStatuses.DRAFT;
  }

  get isClosed(): boolean {
    return this.businessStatus === ServiceStatuses.CLOSED;
  }

  get statusBusinessIcon(): string {
    return this.isPublished ? 'assets/icon/business-close.svg' : 'assets/icon/create-business.svg';
  }

  get statusBusinessText(): string {
    return this.isPublished ? 'business.close_business' : 'business.open_business';
  }

}
