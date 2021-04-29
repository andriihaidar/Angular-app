import { Action, createReducer, on } from '@ngrx/store';
import { StoreItem } from '../../models/store-item.interface';
import { initialState } from './business.state';
import * as businessActions from './business.actions';

import { BusinessState } from '../../models/store.interface';
import { BusinessDTO, OfferDTO } from '@app/core/models/business';
import { CreateBusinessActions } from '../create-business';
import { updateStatus } from '../requests/requests.actions';

const businessReducer = createReducer(
  initialState,

  on(businessActions.getMyBusinesses.request, (state: StoreItem<BusinessState>) => ({
    ...state,
    loadings: {
      ...state.loadings,
      businesses: true,
    }
  })),
  on(businessActions.getMyBusinesses.success, (state: StoreItem<BusinessState>, { businessList }) => ({
      ...state,
      data: {
        ...state.data,
        businessList
      },
      loadings: {
        ...state.loadings,
        businesses: false,
      }
  })),
  on(businessActions.getMyBusinesses.failure, (state: StoreItem<BusinessState>) => ({
    ...state,
    loadings: {
      ...state.loadings,
      businesses: true,
    }
  })),
  on(businessActions.getOffers.success, (state: StoreItem<BusinessState>, { offersList }) => ({
    ...state,
    data: {
      ...state.data,
      offersList
    },
    loadings: {
      ...state.loadings,
      offers: false,
    }
})),
  on(businessActions.getMyOffers.request, (state: StoreItem<BusinessState>) => ({
    ...state,
    loadings: {
      ...state.loadings,
      offers: true,
    }
  })),
  on(businessActions.getMyOffers.success, (state: StoreItem<BusinessState>, { offersList }) => ({
    ...state,
    data: {
      ...state.data,
      offersList
    },
    loadings: {
      ...state.loadings,
      offers: false,
    }
})),

  on(businessActions.addBusiness, (state: StoreItem<BusinessState>, { business }) => ({
    ...state,
    data: {
      ...state.data,
      businessList: [business, ...state.data.businessList],
    }
  })),

  on(businessActions.updateBusinessStatus, (state: StoreItem<BusinessState>, { status }) => ({
    ...state,
    data: {
      ...state.data,
      selectedBusiness: {
        ...state.data.selectedBusiness,
        status
      },
      businessList: state.data.businessList.map((business) => business._id === state.data.selectedBusiness._id
        ? { ...business, status }
        : business
      )
    }
  })),

  on(businessActions.getBusinessById.request, (state: StoreItem<BusinessState>) => ({
    ...state,
    data: {
      ...state.data,
      selectedBusiness: {} as BusinessDTO,
      isDeletedBusiness: false,
    }
  })),

  on(businessActions.getBusinessById.success, (state: StoreItem<BusinessState>, { selectedBusiness }) => ({
    ...state,
    data: {
      ...state.data,
      selectedBusiness: {
        ...state.data.selectedBusiness,
        ...selectedBusiness
      },
    }
  })),

  on(businessActions.getOfferById.request, (state: StoreItem<BusinessState>) => ({
    ...state,
    data: {
      ...state.data,
      selectedOffer: {} as OfferDTO,
      loadings: {
        business: false,
        offers: true
      }
    }
  })),
  on(businessActions.getOfferById.success, (state: StoreItem<BusinessState>, { selectedOffer }) => ({
    ...state,
    data: {
      ...state.data,
      selectedOffer,
      loadings: {
        business: false,
        offers: false
      }
    }
  })),
  on(businessActions.getOfferById.failure, (state: StoreItem<BusinessState>, {  }) => ({
    ...state,
    data: {
      ...state.data,
      loadings: {
        business: false,
        offers: false
      }
    }
  })),

  on(businessActions.getOfferById.request, (state: StoreItem<BusinessState>) => ({
    ...state,
    data: {
      ...state.data,
      selectedOffer: {} as OfferDTO
    }
  })),

  on(businessActions.getOfferById.success, (state: StoreItem<BusinessState>, { selectedOffer }) => ({
    ...state,
    data: {
      ...state.data,
      selectedOffer,
    }
  })),

  on(businessActions.toggleOfferStatus, (state: StoreItem<BusinessState>, { offerId, updatedStatus }) => {
    const updatedOffersList = state.data.offersList.map((offer) => {
      if (offer._id === offerId) {
        return {
          ...offer,
          status: updatedStatus
        }
      }
      return offer;
    })
    return {
      ...state,
      data: {
        ...state.data,
        offersList: updatedOffersList,
        selectedOffer: {
          ...state.data.selectedOffer,
          status: updatedStatus
        }
      }
    }
  }),

  on(businessActions.getFaqByBusinessId.success, (state: StoreItem<BusinessState>, { faq }) => ({
    ...state,
    data: {
      ...state.data,
      faq,
    }
  })),

  on(businessActions.getServicesByBusinessId.success, (state: StoreItem<BusinessState>,
    { servicesList, scheduleList, serviceDuration, serviceRateType, serviceId }) => ({
    ...state,
    data: {
      ...state.data,
      servicesList,
      scheduleList,
      selectedBusiness: {
        ...state.data.selectedBusiness,
        serviceDuration,
        serviceRateType,
        serviceId
      },
      serviceId,
    }
  })),


  on(businessActions.getServicesByBusinessId.request, (state: StoreItem<BusinessState>) => ({
    ...state,
    data: {
      ...state.data,
      servicesList: [],
      scheduleList: [],
      serviceId: null,
    }
  })),

  on(businessActions.setRequestedServices, (state: StoreItem<BusinessState>, { timeslot, services }) => ({
    ...state,
    data: {
      ...state.data,
      requestedTimeslot: timeslot,
      requestedServices: services,
    }
  })),

  on(businessActions.getTeamMembersByBusinessId.success, (state: StoreItem<BusinessState>, { teamMembersList }) => ({
    ...state,
    data: {
      ...state.data,
      teamMembersList
    }
  })),

  on(businessActions.getTimeSlotsByDate.request, (state: StoreItem<BusinessState>) => ({
    ...state,
    data: {
      ...state.data,
      slotsByDate: [],
    },
    loadings: {
      ...state.loadings,
      timeslots: true
    }
  })),

  on(businessActions.getTimeSlotsByDate.success, (state: StoreItem<BusinessState>, { slots }) => ({
    ...state,
    data: {
      ...state.data,
      slotsByDate: slots,
    },
    loadings: {
      ...state.loadings,
      timeslots: false
    }
  })),

  on(businessActions.updatePaymentEmail, (state: StoreItem<BusinessState>, { email }) => ({
    ...state,
    data: {
      ...state.data,
      paymentEmail: email
    }
  })),
  on(businessActions.getTimeSlotsByDate.failure, (state: StoreItem<BusinessState>) => ({
    ...state,
    loadings: {
      ...state.loadings,
      timeslots: false
    }
  })),

  on(businessActions.updateBusinessProfile.success, (state: StoreItem<BusinessState>, { params }) => ({
    ...state,
    data: {
      ...state.data,
      selectedBusiness: {
        ...state.data.selectedBusiness,
        businessName: params.businessName,
        businessDescription: params.businessDescription,
        serviceToProvide: params.serviceToProvide,
      }
    }
  })),

  on(businessActions.uploadBusinessPhoto.success, (state: StoreItem<BusinessState>, { photoData }) => ({
    ...state,
    data: {
      ...state.data,
      selectedBusiness: {
        ...state.data.selectedBusiness,
        photoUrl: photoData.photoUrl
      }
    }
  })),

  on(businessActions.updateLocation.success, (state: StoreItem<BusinessState>, { params }) => ({
    ...state,
    data: {
      ...state.data,
      selectedBusiness: {
        ...state.data.selectedBusiness,
        locationLatitude: params.locationLatitude,
        locationLongitude: params.locationLongitude,
        radius: params.radius,
        address: params.address,
      }
    }
  })),

  on(businessActions.updateTeamMembers.success, (state: StoreItem<BusinessState>, { teamMembers }) => ({
    ...state,
    data: {
      ...state.data,
      teamMembersList: teamMembers
    }
  })),

  on(businessActions.updateRules.success, (state: StoreItem<BusinessState>, { rules }) => ({
    ...state,
    data: {
      ...state.data,
      selectedBusiness: {
        ...state.data.selectedBusiness,
        rules
      }
    }
  })),

  on(businessActions.updateFaq.success, (state: StoreItem<BusinessState>, { faq }) => ({
    ...state,
    data: {
      ...state.data,
      faq
    }
  })),

  on(businessActions.getPaymentEmail.success, (state: StoreItem<BusinessState>, { email }) => ({
    ...state,
    data: {
      ...state.data,
      paymentEmail: email,
    }
  })),

  on(businessActions.setRedirectUrl, (state: StoreItem<BusinessState>, { url }) => ({
    ...state,
    data: {
      ...state.data,
      editRedirectUrl: url
    }
  })),

  on(businessActions.editServices.success, (state: StoreItem<BusinessState>, { servicesList }) => ({
    ...state,
    data: {
      ...state.data,
      servicesList
    }
  })),

  on(businessActions.editSchedule.success, (state: StoreItem<BusinessState>, { scheduleList }) => ({
    ...state,
    data: {
      ...state.data,
      scheduleList
    }
  })),
  on(businessActions.deleteBusiness.success, (state: StoreItem<BusinessState>, { businessId }) => ({
    ...state,
    data: {
      ...state.data,
      businessList: state.data.businessList.filter(({ _id }) => _id !== businessId),
      isDeletedBusiness: true,
    }
  })),

  on(businessActions.clearBusinessInfo, (state: StoreItem<BusinessState>) => ({
    ...state,
    data: {
      ...state.data,
      selectedBusiness: null
    }
  }))

)

export function reducer(state: StoreItem<BusinessState>, action: Action) {
  return businessReducer(state, action);
}
