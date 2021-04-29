import { createSelector, createFeatureSelector } from '@ngrx/store';
import { StoreItem } from '../../models/store-item.interface';
import { BusinessState } from '../../models/store.interface';

export const selectBusinessState = createFeatureSelector('business');

export const selectBusinessData = createSelector(
  selectBusinessState,
  (state: StoreItem<BusinessState>) => state?.data,
);

export const selectEditRedirectUrl = createSelector(
  selectBusinessState,
  (state: StoreItem<BusinessState>) => state?.data?.editRedirectUrl
)

export const selectIsDeletedBusiness = createSelector(
  selectBusinessState,
  (state: StoreItem<BusinessState>) => state?.data?.isDeletedBusiness
);

export const selectPaymentEmail = createSelector(
  selectBusinessState,
  (state: StoreItem<BusinessState>) => state?.data?.paymentEmail
);

export const selectSelectedBusiness = createSelector(
  selectBusinessState,
  (state: StoreItem<BusinessState>) => state?.data?.selectedBusiness
);

export const selectBusinessLoadings = createSelector(
  selectBusinessState,
  (state: StoreItem<BusinessState>) => state?.loadings,
);

export const selectServiceId = createSelector(
  selectBusinessState,
  (state: StoreItem<BusinessState>) => state?.data.serviceId,
);

export const selectTimeslotLoadings = createSelector(
  selectBusinessState,
  (state: StoreItem<BusinessState>) => state?.loadings?.timeslots
)

export const selectBusinessErrors = createSelector(
  selectBusinessState,
  (state: StoreItem<BusinessState>) => state?.errors,
);
