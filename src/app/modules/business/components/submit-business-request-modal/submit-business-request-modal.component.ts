import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/models/store.interface';
import { BusinessDTO, ScheduleDTO, Service, TeamMemberDTO } from '@app/core/models/business';
import { Request, ConsumerRequestsDTO } from '@app/core/models/requests';
import { Subscription } from 'rxjs';
import { selectBusinessData } from 'src/app/core/store/business/business.selectors';
import { RequestsActions } from 'src/app/core/store/requests';
import { selectRequestsData } from 'src/app/core/store/requests/requests.selectors';
import { DEFAULT_USER_IMAGE } from 'constants/components.constants';
import { TypesOfUser } from '@app/core/models/user';
import * as moment from 'moment';

@Component({
  selector: 'app-submit-business-request-modal',
  templateUrl: './submit-business-request-modal.component.html',
  styleUrls: ['./submit-business-request-modal.component.scss']
})
export class SubmitBusinessRequestModalComponent implements OnInit, OnDestroy {
  readonly defaultUserImage = DEFAULT_USER_IMAGE;
  readonly subscriptions: Subscription[] = [];

  @Input() slot: ScheduleDTO;
  @Input() services: { list: Service[], total: number } = { list: [], total: 0 };
  @Input() date: Date;

  isRequestSent = false;
  business: BusinessDTO;
  createdRequest: ConsumerRequestsDTO;
  teamMembers: TeamMemberDTO[] = [];
  request: { business: BusinessDTO }

  constructor(
    public modalController: ModalController,
    private store: Store<AppState>,
    private navCtrl: NavController,
  ) { }

  ngOnInit(): void {
    this.selectDataFromStore();
  }

  selectDataFromStore() {
    this.subscriptions[0] = this.store.select(selectBusinessData)
      .subscribe((data) => {
        if (data) {
          this.business = data.selectedBusiness;
          this.request = { business: this.business }

          this.teamMembers = data.teamMembersList;
        }
      })

    this.subscriptions[1] = this.store.select(selectRequestsData)
      .subscribe((data) => {
        if (data) {
          this.isRequestSent = data.isCreatedRequest;
        }
      })

    this.subscriptions[2] = this.store.select(selectRequestsData)
      .subscribe((data) => {
        if (data) {
          this.createdRequest = data.createdRequest;
        }
      })
  }

  dismiss() {
    this.modalController.dismiss();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  sendRequest() {
    const requestParams: Request = {
      businessId: this.business._id,
      scheduleId: this.slot._id,
      serviceList: this.services.list.map(({ _id }) => _id),
      price: this.totalSum,
      date: moment(this.date).format('YYYY-MM-DD').toString()
    };
    this.store.dispatch(RequestsActions.createRequestBusiness.request({ requestParams }));
  }

  async closeModal() {
    if (this.isRequestSent) {
      this.dismiss();
      this.navCtrl.navigateForward('/tabs/requests');
    } else {
      this.dismiss();
    }
  }

  createChatroom() {
    this.navCtrl.navigateForward(`tabs/chats?chat=${this.createdRequest.chat._id}&type=${TypesOfUser.PROVIDER}`);
    this.dismiss();
  }

  get fullName() {
    return `${this.business.user.firstName} ${this.business.user.lastName}`
  }

  get totalSum() {
    return this.services.list.reduce((sum, service) => sum + Number(service.serviceRate), 0);
  }

}
