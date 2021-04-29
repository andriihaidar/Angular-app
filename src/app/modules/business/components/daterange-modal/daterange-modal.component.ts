import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatepickerOptions } from '@app/features/ui/components/datepicker/datepicker.component';
import { ScheduleDTO, ServiceDTO, BusinessDTO } from '@app/core/models/business';
import { SlotsModalComponent } from '../slots-modal/slots-modal.component';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/models/store.interface';
import { BusinessActions } from 'src/app/core/store/business';
import { selectRequestsData } from 'src/app/core/store/requests/requests.selectors';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-daterange-modal',
  templateUrl: './daterange-modal.component.html',
  styleUrls: ['./daterange-modal.component.scss']
})
export class DateRangeComponent implements OnInit, OnDestroy{
  @Input() schedule: ScheduleDTO[] = [];
  @Input() services: { list: ServiceDTO[], total: number };
  @Input() business: BusinessDTO;

  public datepickerOptions: DatepickerOptions = {
    useEmptyBarTitle: false,
    firstCalendarDay: 1,
    minDate: new Date(),
    minYear: new Date().getFullYear(),
  };
  startDate: Date;
  endDate: Date;
  selectedTimeSlot: ScheduleDTO;
  modalSubscription: Subscription;
  modal;

  constructor(
    public modalController: ModalController,
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.selectDataFromStore();
  }

  selectDataFromStore() {
    this.modalSubscription = this.store.select(selectRequestsData)
    .subscribe((data) => {
      if (data && data.isCreatedRequest) {
        this.modal.dismiss();
      }
    })
  }

  dismiss() {
    this.modalController.dismiss();
  }

  onDateChange() {
  }

  setStartDate(date) {
    this.startDate = new Date(date);
  }

  setEndDate(date) {
    this.endDate = new Date(date);
  }

  closeModal() {
    const data = {
      startDate: this.startDate,
      endDate: this.endDate,
    }
    this.modalController.dismiss(data);
  }

  async presentModal() {
  }

  ngOnDestroy() {
    this.modalSubscription.unsubscribe();
  }
}
