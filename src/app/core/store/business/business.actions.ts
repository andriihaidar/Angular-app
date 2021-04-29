import { createAction, props } from '@ngrx/store';
import { createActionType, createApiAction } from 'src/app/core/helpers/effects';
import {
  BusinessDTO,
  Service,
  FaqDTO,
  ScheduleDTO,
  ServiceDTO,
  OfferDTO,
  BusinessRuleIdDTO,
  EditLocation,
  EditParams,
  EditBusinessProfile,
  TeamMemberDTO
} from '@app/core/models/business';
import { PhotoData } from '@app/core/models/photo';

const GET_BUSINESSES = createActionType('[GET_BUSINESSES] getBusiness');
const GET_OFFERS = createActionType('[GET_OFFERS] getOffers');
const GET_MY_OFFERS = createActionType('[GET_MY_OFFERS] getMyOffers');
const GET_BUSINESS_BY_ID = createActionType('[GET_BUSINESS_BY_ID] getBusinessById');
const GET_OFFER_BY_ID = createActionType('[GET_OFFER_BY_ID] getOfferById');
const GET_FAQ_BY_BUSINESS_ID = createActionType('[GET_FAQ_BY_BUSINESS_ID] getFAQByBusinessId');
const GET_SERVICES_BY_BUSINESS_ID = createActionType('[GET_SERVICES_BY_BUSINESS_ID] getServicesByBusinessId');
const GET_TEAM_MEMBERS_LIST_BY_BUSINESS_ID = createActionType('[GET_TEAM_MEMBERS_LIST_BY_BUSINESS_ID] getTeamMembersList');
const GET_TIME_SLOTS_BY_DATE = createActionType('[GET_TIME_SLOTS_BY_DATE] getTimeSlotsByDate');
const GET_PAYMENT_EMAIL = createActionType('[GET_PAYMENT_EMAIL] getPaymentEmail');
const EDIT_SERVICES = createActionType('[EDIT_SERVICE] editServices');
const EDIT_SCHEDULE = createActionType('[EDIT_SCHEDULE] editSchedule');
const TOGGLE_AVAILABILITY_SERVICE = createActionType('[TOGGLE_AVAILABILITY_SERVICE] toggleAvailabilityService');
const DELETE_BUSINESS = createActionType('[DELETE_BUSINESS] deleteBusiness');
const SET_REQUESTED_SERVICES = '[SET_REQUESTED_SERVICES] setRequestedBusiness';
const ADD_BUSINESS = '[ADD_BUSINESS] addBusiness';
const SET_REDIRECT_URL = '[SET_REDIRECT_URL] setRedirectUrl';
const TOGGLE_BUSINESS_STATUS = createActionType('[TOGGLE_BUSINESS_STATUS] toggleBusinessStatus');
const TOGGLE_OFFER_STATUS = '[TOGGLE_OFFER_STATUS] toggleOfferStatus';
const UPDATE_BUSINESS_STATUS = '[UPDATE_BUSINESS_STATUS] updateBusinessStatus';
const CLEAR_BUSINESS_INFO = '[CLEAR_BUSINESS_INFO] clearBusinessInfo';
const UPDATE_BUSINESS_PROFILE = createActionType('[UPDATE_BUSINESS_PROFILE] updateBusinessProfile');
const UPDATE_LOCATION = createActionType('[UPDATE_LOCATION] updateLocation');
const UPDATE_FAQ = createActionType('[UPDATE_FAQ] updateFAQ');
const UPDATE_RULES = createActionType('[UPDATE_RULES] updateRules');
const UPDATE_TEAM_MEMBERS = createActionType('[UPDATE_TEAM_MEMBERS] updateTeamMembers');
const UPLOAD_BUSINESS_PHOTO = createActionType('[UPLOAD_BUSINESS_PHOTO] uploadBusinessPhoto');
const UPDATE_PAYMENT_EMAIL = '[UPDATE_PAYMENT_EMAIL] updatePaymentEmail';

export const setRequestedServices = createAction(SET_REQUESTED_SERVICES, props<{ timeslot: ScheduleDTO, services: ServiceDTO[] }>());
export const addBusiness = createAction(ADD_BUSINESS, props<{ business: BusinessDTO }>());
export const setRedirectUrl = createAction(SET_REDIRECT_URL, props<{ url: string }>());
export const updateBusinessStatus = createAction(UPDATE_BUSINESS_STATUS, props<{ status: string }>());
export const toggleOfferStatus = createAction(TOGGLE_OFFER_STATUS, props<{ offerId: string, updatedStatus: string }>());
export const clearBusinessInfo = createAction(CLEAR_BUSINESS_INFO, props<{ }>());
export const updatePaymentEmail = createAction(UPDATE_PAYMENT_EMAIL, props<{ email: string }>());

export const getMyBusinesses = createApiAction(GET_BUSINESSES, {
  success: props<{ businessList: BusinessDTO[] }>(),
});

export const getOffers = createApiAction(GET_OFFERS, {
  success: props<{ offersList: OfferDTO[] }>(),
});

export const getMyOffers = createApiAction(GET_MY_OFFERS, {
  success: props<{ offersList: OfferDTO[] }>(),
});

export const getBusinessById = createApiAction(GET_BUSINESS_BY_ID, {
  request: props<{ id: string }>(),
  success: props<{ selectedBusiness: BusinessDTO }>(),
});

export const getOfferById = createApiAction(GET_OFFER_BY_ID, {
  request: props<{ id: string }>(),
  success: props<{ selectedOffer: OfferDTO }>(),
});

export const getFaqByBusinessId = createApiAction(GET_FAQ_BY_BUSINESS_ID, {
  request: props<{ id: string }>(),
  success: props<{ faq: FaqDTO[] }>(),
});

export const getServicesByBusinessId = createApiAction(GET_SERVICES_BY_BUSINESS_ID, {
  request: props<{ id: string }>(),
  success: props<{
    servicesList: Service[],
    scheduleList: ScheduleDTO[],
    serviceDuration: number,
    serviceRateType: string,
    serviceId: string,
  }>()
});

export const getTimeSlotsByDate = createApiAction(GET_TIME_SLOTS_BY_DATE, {
  request: props<{ businessId: string, date: string }>(),
  success: props<{ slots: { schedule: ScheduleDTO, disable: boolean}[] }>()
});

export const getTeamMembersByBusinessId = createApiAction(GET_TEAM_MEMBERS_LIST_BY_BUSINESS_ID, {
  request: props<{ businessId: string }>(),
  success: props<{ teamMembersList: any[] }>()
});

export const getPaymentEmail = createApiAction(GET_PAYMENT_EMAIL, {
  request: props<{ businessId: string }>(),
  success: props<{ email: string}>(),
});

export const editServices = createApiAction(EDIT_SERVICES, {
  request: props<{ businessId: string, params: Service[], redirectUrl: string }>(),
  success: props<{ servicesList: Service[] }>()
});

export const editSchedule = createApiAction(EDIT_SCHEDULE, {
  request: props<{ params: ScheduleDTO[], businessId: string }>(),
  success: props<{ scheduleList: ScheduleDTO[] }>(),
});

export const toggleAvailabilityService = createApiAction(TOGGLE_AVAILABILITY_SERVICE, {
  request: props<{ service: Service }>(),
});

export const deleteBusiness = createApiAction(DELETE_BUSINESS, {
  request: props<{ businessId: string, password: string }>(),
  success: props<{ businessId: string }>(),
});

export const toggleBusinessStatus = createApiAction(TOGGLE_BUSINESS_STATUS, {
  request: props<{ businessId: string, updatedStatus: string }>()
});

export const updateBusinessProfile = createApiAction(UPDATE_BUSINESS_PROFILE, {
  request: props<{ params: EditBusinessProfile, businessId: string, isEdit: boolean, updatePhoto: boolean }>(),
  success: props<{ params: EditParams }>(),
});

export const updateLocation = createApiAction(UPDATE_LOCATION, {
  request: props<{ params: EditLocation, businessId: string, isSave: boolean, isEdit: boolean }>(),
  success: props<{ params: EditParams }>(),
});

export const updateFaq = createApiAction(UPDATE_FAQ, {
  request: props<{ faq: FaqDTO[], isEdit: boolean }>(),
  success: props<{ faq: FaqDTO[] }>(),
});

export const updateRules = createApiAction(UPDATE_RULES, {
  request: props<{ rules: BusinessRuleIdDTO[], businessId: string }>(),
  success: props<{ rules: BusinessRuleIdDTO[] }>()
});

export const updateTeamMembers = createApiAction(UPDATE_TEAM_MEMBERS, {
  request: props<{ teamMembers: any[] }>(),
  success: props<{ teamMembers: TeamMemberDTO[] }>(),
});

export const uploadBusinessPhoto = createApiAction(UPLOAD_BUSINESS_PHOTO, {
  success: props<{ photoData: PhotoData }>()
});
