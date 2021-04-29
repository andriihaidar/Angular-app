import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatepickerOptions, Day } from '@app/features/ui/components/datepicker/datepicker.component';
import { ScheduleDTO, ServiceDTO, BusinessDTO } from '@app/core/models/business';
import { SlotsModalComponent } from '../slots-modal/slots-modal.component';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/models/store.interface';
import { BusinessActions } from 'src/app/core/store/business';
import { selectRequestsData, selectDisabledDaysLoadings, selectDisabledDays } from 'src/app/core/store/requests/requests.selectors';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { RequestsActions } from 'src/app/core/store/requests';
import { DisabledTimeslot } from '@app/core/models/requests';

@Component({
  selector: 'app-datepicker-modal',
  templateUrl: './datepicker-modal.component.html',
  styleUrls: ['./datepicker-modal.component.scss']
})
export class DatepickerModalComponent implements OnInit, OnDestroy{
  @Input() schedule: ScheduleDTO[] = [];
  @Input() services: { list: ServiceDTO[], total: number };
  @Input() business: BusinessDTO;

  public datepickerOptions: DatepickerOptions = {
    useEmptyBarTitle: false,
    firstCalendarDay: 0,
    minDate: new Date(),
    minYear: new Date().getFullYear(),
  };
  date: Date;
  selectedTimeSlot: ScheduleDTO;
  subscriptions: Subscription[] = [];
  disabledDaysLoading$ = this.store.select(selectDisabledDaysLoadings);
  disabledDays: number[] = [];
  filledDays: string[] = [];
  modal;

  constructor(
    public modalController: ModalController,
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(RequestsActions.getDisabledDays.request({ businessId: this.business._id, date: moment().format('YYYY-MM-DD')}))
    this.selectDataFromStore();
  }

  selectDataFromStore() {
    this.subscriptions[0] = this.store.select(selectRequestsData)
    .subscribe((data) => {
      if (data && data.isCreatedRequest) {
        this.modal.dismiss();
      }
    })

    this.subscriptions[1] = this.store.select(selectDisabledDays)
      .subscribe((data: DisabledTimeslot[]) => {
        this.disabledDays = data.map(({ date }) => moment(date).date());
        this.filledDays = this.schedule.map(({ day }) => day)
      })
  }

  dismiss() {
    this.modalController.dismiss();
  }

  changeMonth(day: Day) {
    this.store.dispatch(RequestsActions.getDisabledDays.request({
      businessId: this.business._id,
      date: moment(day.date).format('YYYY-MM-DD')
    }))
  }

  onDateChange() {
    this.presentModal();
    this.store.dispatch(BusinessActions.getTimeSlotsByDate
      .request({ businessId: this.business._id, date: moment(this.date).format('YYYY-MM-DD') }));
  }

  async presentModal() {
    this.modal = await this.modalController.create({
      component: SlotsModalComponent,
      cssClass: 'bottom-modal',
      swipeToClose: true,
      animated: false,
      componentProps: {
        services: this.services,
        date: this.date,
      },
    })
    return await this.modal.present();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
