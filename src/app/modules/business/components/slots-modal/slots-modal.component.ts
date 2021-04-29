import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ScheduleDTO, ServiceDTO, BusinessDTO } from '@app/core/models/business';
import { SubmitBusinessRequestModalComponent } from '../submit-business-request-modal/submit-business-request-modal.component';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/models/store.interface';
import { Subscription } from 'rxjs';
import { selectBusinessData, selectTimeslotLoadings } from 'src/app/core/store/business/business.selectors';
import { minutesToTime } from '@app/utils/time-converter';

@Component({
  selector: 'app-slots-modal',
  templateUrl: './slots-modal.component.html',
  styleUrls: ['./slots-modal.component.scss']
})
export class SlotsModalComponent implements OnInit, OnDestroy {
  @Input() services: { list: ServiceDTO[], total: number };
  @Input() date: Date;
  @Input() business: BusinessDTO;

  timeslotsSubscription: Subscription;
  selectedTimeSlot: { schedule: ScheduleDTO, disable: boolean};
  slotsByDate: { schedule: ScheduleDTO, disable: boolean}[] = [];
  loading$ = this.store.select(selectTimeslotLoadings);
  modal;

  constructor(
    public modalController: ModalController,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.selectDataFromStore();
  }

  selectDataFromStore() {
    this.timeslotsSubscription = this.store.select(selectBusinessData)
      .subscribe((data) => {
        if (data) {
          this.slotsByDate = data.slotsByDate;
        }
      })
  }


  dismiss() {
    this.modalController.dismiss();
  }

  setTimeSlot(slot: { schedule: ScheduleDTO, disable: boolean}) {
    this.selectedTimeSlot = slot;
  }

  next() {
    this.presentModal();
  }


  async presentModal() {
    this.modal = await this.modalController.create({
      component: SubmitBusinessRequestModalComponent,
      componentProps: {
        slot: this.selectedTimeSlot.schedule,
        services: this.services,
        date: this.date,
      },
    })
    await this.modal.present();
  }

  convertTime(hour) { return minutesToTime(hour) }

  ngOnDestroy() {
    this.timeslotsSubscription.unsubscribe();
  }

}
