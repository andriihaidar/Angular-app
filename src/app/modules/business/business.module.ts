import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessRoutingModule } from './business-routing.module';
import { BusinessDetailsPage } from './pages/business-details/business-details.page';
import { SharedModule } from '../../features/shared/shared.module';
import { DatepickerModalComponent } from './components/datepicker-modal/datepicker-modal.component';
import { SlotsModalComponent } from './components/slots-modal/slots-modal.component';
import { SubmitBusinessRequestModalComponent } from './components/submit-business-request-modal/submit-business-request-modal.component';
import { DateRangeComponent } from './components/daterange-modal/daterange-modal.component';
import { BusinessMenuComponent } from './components/business-menu/business-menu.component';
import { ToggleBusinessStatusModalComponent } from './components/toggle-business-status-modal/toggle-business-status-modal.component';

@NgModule({
  declarations: [
    BusinessDetailsPage,
    DatepickerModalComponent,
    DateRangeComponent,
    SlotsModalComponent,
    SubmitBusinessRequestModalComponent,
    BusinessMenuComponent,
    ToggleBusinessStatusModalComponent,
  ],
  imports: [
    CommonModule,
    BusinessRoutingModule,
    SharedModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BusinessModule { }
