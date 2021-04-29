import { StoreItem } from '../../models/store-item.interface';
import { BusinessState } from '../../models/store.interface';
import { BusinessDTO, OfferDTO, ScheduleDTO } from '@app/core/models/business';

export const initialState: StoreItem<BusinessState> = {
  data: {
    selectedBusiness: {} as BusinessDTO,
    selectedOffer: {} as OfferDTO,
    faq: [],
    servicesList: [],
    scheduleList: [],
    requestedServices: [],
    requestedTimeslot: {} as ScheduleDTO,
    teamMembersList: [],
    slotsByDate: [],
    businessList: [],
    offersList: [],
    paymentEmail: '',
    editRedirectUrl: '',
    isDeletedBusiness: false,
    serviceId: '',
  },
  loadings: {
    businesses: false,
    timeslots: false,
  },
  errors: {}
};
