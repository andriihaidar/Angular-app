import { PhotoData } from './photo';
import { User } from './user';
import { ServiceStatuses, RateTypes } from 'constants/components.constants';

export interface TopicCategory {
  category: string;
  items: FaqDTO[];
}

export interface BusinessType {
  title: string;
  img: string;
  url?: string;
}

export enum BusinessTypes {
  SERVICES = 'services',
  TRANSPORTATION = 'transportation',
  GOODS = 'goods',
}

export interface BusinessLocation {
  locationLatitude: number;
  locationLongitude: number;
  radius: number;
  address: string;
}

export interface OfferLocation {
  latitude: number;
  longitude: number;
  radius: number;
  address: string;
}

export interface BusinessTeamMember {
  userId?: string;
  user?: User;
  teamRole: string;
}

export interface BusinessInfo {
  businessName: string;
  businessDescription: string;
}

export interface OfferInfo {
  serviceToProvide: string;
  description: string;
  offerDuration: number;
  location: {
    latitude: number;
    longitude: number;
    address: string;
    radius: number
  };
  serviceRate: number;
  status: string;
  remote: boolean;
  _id?: string;
  statusChanged?: boolean;
}

export interface OfferDTO {
  serviceToProvide?: string;
  availabilityStatus?: boolean;
  description?: string;
  offerDuration?: number;
  address?: string;
  radius?: number;
  location?: {
    latitude: number;
    longitude: number;
    address: string;
    radius: number
  };
  locationLatitude?: number;
  locationLongitude?: number;
  serviceRate?: number;
  serviceRateType?: string;
  serviceDuration?: number;
  remote?: boolean;
  createdAt?: string;
  expireAt?: string;
  offer?: OfferInfo;
  owner?: User;
  status?: string;
  user?: string;
  __v?: number;
  _id?: string;
}

export interface Service {
  serviceName: string;
  serviceRate?: number;
  _id?: string;
  deleted?: boolean;
  available?: boolean;
  photoPath?: string[];
  photoUrl?: string[];
}

export interface ServiceListInfo {
  servicesList: Service[];
  businessId: string;
}

export interface CurrentLocationInfo {
  locationLatitude: number;
  locationLongitude: number;
  radius: number;
  serviceList?: string[];
}

export interface CreateBusinessBodyDto {
  data: {
    success: boolean;
    businessId: string;
  }
}

export interface UploadCoverImageDto {
  data: PhotoData
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface BusinessDTO {
  address: string;
  businessDescription: string;
  businessName: string;
  createdAt: string;
  locationLongitude: number;
  locationLatitude: number;
  radius: number;
  serviceToProvide: string[];
  status: string;
  type: string[];
  photoPath: string;
  photoUrl: string;
  userId: string;
  __v: number;
  _id: string;
  rate?: number;
  rules?: BusinessRuleIdDTO[];
  user?: User;
  serviceRateType?: string;
  serviceDuration?: number;
  remoteOnly: boolean;
  serviceId?: string;
}

export interface FaqDTO {
  businessId?: string;
  createdAt?: string;
  question: string;
  answer: string;
  selected?: boolean;
  category?: string;
  ___v?:number;
  _id?: string;
}

export interface ServiceDTO {
  businessId: string;
  createdAt: string;
  __v: number;
  _id: string;
  servicesList: Service[];
  scheduleList: ScheduleDTO[];
  available?: boolean;
}

export interface ScheduleDTO {
  createdAt?: string;
  day: string;
  startHour: string;
  endHour: string;
  _id?: string;
}

export interface TeamMemberDTO {
  businessId: string;
  createdAt: string;
  teamRole: string;
  user: User;
  __v: number;
  _id: string;
}

export interface BusinessesByLocationDTO {
  success: boolean;
  businesses: BusinessDTO[];
  popularBusinesses: {
    businesses: BusinessDTO[];
  };
  list_of_service: {
    ServiceToProvide: Record<string, string>;
  };
}

export interface BusinessRuleIdDTO {
  description: string;
  _id?: string;
  deleted?: boolean;
}

export interface BusinessesByLocationParams {
  locationLatitude?: number;
  locationLongitude?: number;
  radius?: number;
  serviceList?: string[];
}

export interface BusinessTag {
  title: string;
  value: string;
}

export interface Search {
  countOfSearch: number;
  createdAt: string;
  searchText: string;
  updatedAt: string;
  userId: string;
  __v: number;
  _id: string;
}

export interface PopularBusinessesSearch {
  businesses: BusinessDTO[];
  sortedByUpdatedAt: Search[];
  success: boolean;
}

export interface EditParams extends EditBusinessProfile, EditLocation {
  type?: string;
  status?: ServiceStatuses;
}

export interface EditBusinessProfile {
  businessName?: string;
  businessDescription?: string;
  serviceToProvide?: string[];
}

export interface EditLocation {
  address?: string;
  locationLongitude?: number;
  locationLatitude?: number;
  radius?: number;
}

export interface ServicesListDTO {
  servicesList: Service[];
  scheduleList: ScheduleDTO[];
  serviceDuration: number;
  serviceRateType: RateTypes;
  _id: string;
}
