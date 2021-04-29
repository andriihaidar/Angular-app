import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ServiceStatuses } from 'constants/components.constants';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/models/store.interface';
import { BusinessActions } from 'src/app/core/store/business';

@Component({
  selector: 'app-toggle-business-status-modal',
  templateUrl: './toggle-business-status-modal.component.html',
  styleUrls: ['./toggle-business-status-modal.component.scss']
})
export class ToggleBusinessStatusModalComponent {
  @Input() businessId: string;
  @Input() status: string;

  constructor(
    private modalController: ModalController,
    private store: Store<AppState>
  ) { }

  toggleBusinessStatus() {
    this.store.dispatch(BusinessActions.toggleBusinessStatus.request({
      businessId: this.businessId,
      updatedStatus: this.isPublished ? ServiceStatuses.CLOSED : ServiceStatuses.PUBLISHED
    }));
  }

  dismiss() {
    this.modalController.dismiss();
  }

  get isPublished(): boolean {
    return this.status === ServiceStatuses.PUBLISHED;
  }

  get isClosed(): boolean {
    return this.status === ServiceStatuses.CLOSED;
  }

  get title(): string {
    return this.isClosed ? 'business.open_business_answer' : 'business.close_business_answer';
  }

  get subTitle(): string {
    return this.isClosed ? 'business.open_business_answer_desc' : 'business.close_business_answer_desc';
  }

  get acceptButtonText(): string {
    return this.isClosed ? 'business.open_business_accept' : 'business.close_business_accept';
  }

}
