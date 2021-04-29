import {
  Service,
  BusinessDTO,
  FaqDTO,
  ScheduleDTO,
  ServiceDTO,
  TeamMemberDTO,
  OfferDTO,
} from '@app/core/models/business';
import { StoreItem } from './store-item.interface';

export class AppState {
  readonly business: StoreItem<BusinessState>;
}

export interface BusinessState {
  selectedBusiness: BusinessDTO;
  selectedOffer: OfferDTO;
  faq: FaqDTO[];
  servicesList: Service[];
  scheduleList: ScheduleDTO[];
  requestedTimeslot: ScheduleDTO;
  requestedServices: ServiceDTO[];
  teamMembersList: TeamMemberDTO[];
  slotsByDate: { schedule: ScheduleDTO, disable: boolean}[];
  businessList: BusinessDTO[];
  offersList: OfferDTO[];
  paymentEmail: string;
  editRedirectUrl: string;
  isDeletedBusiness: boolean;
  serviceId: string;
}
