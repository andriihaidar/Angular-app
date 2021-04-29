import { StoreItem } from '../models/store-item.interface';
import { AppState, BusinessState } from '../models/store.interface';

export const initialState: AppState = {
  business: {} as StoreItem<BusinessState>,
};
